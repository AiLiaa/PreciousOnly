$(document).ready(function () {
    "use strict"; 

    //隐藏登录注册，显示用户名，显示退出
    // changeID();
    // searchChange();
    // collectionPro();
    
    //小屏幕隐藏导航
    $('.header_btn').on('click', function () {
        $(this).toggleClass('header_btn--active');
        $('.header_menu').toggleClass('header_menu--active');
    });
    $('main').on('click', function () {
        $('.header_btn').removeClass('header_btn--active');
        $('.header_menu').removeClass('header_menu--active');
    });

    //小屏幕搜索
    $('.header_search .close, .header_action_search button').on('click', function () {
        $('.header_search').toggleClass('header_search--active');
    });
    $('main').on('click', function () {
        $('.header_search').removeClass('header_search--active');
    });

    //导航偏移300像素，导航栏跟踪
    var fixed_top = $(".header");
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            fixed_top.addClass("header-fixed fadeInUp");
        } else {
            fixed_top.removeClass("header-fixed fadeInUp");
        }
    });
    //选择分区
    $(".item-cat-btn").on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


    //上架后延时跳转到个人中心，弹出信息提示
    $(".readysale").on('click', function (){
        prompt('上架成功!(3秒后跳转)','alert-info',3500);
        setTimeout('delayerTopersonalCenter()', 3000);
    });
    
    //购买成功后延时跳转到个人中心，弹出信息提示
    $(".purchase").on('click', function (){
        prompt('购买成功!(3秒后跳转)','alert-info',3500);
        setTimeout('delayerTopersonalCenter()', 3000);
    });
    

    //上传成功，弹出信息提示，跳转个人中心
    $(".upload-submit-btn").on('click', function (){
        uploadSuccess();
        setTimeout('delayerTopersonalCenter()', 3000);
    });
    
    
    //删除藏品成功，弹出信息提示
    $(".delete-collection-success").on('click', function (){
        removeSuccess();
    });
    

    //编辑我的作品成功
    $(".edit-work-success").on('click', function (){
        modifiedInformationSuccess();
    });

    //下架成功
    $(".off-Shelf-Goods-Success").on('click', function (){
        offShelfGoodsSuccess();
    });
    
    //下架成功
    $(".modified-Information-Success").on('click', function (){
        modifiedInformationSuccess();
    });

    //选择封面
    $(".item-photo").on('click',function(){
        $(".upload-item-bottom").removeClass("upload-hidden");
    });
    $(".item-music").on('click',function(){
        $(".upload-item-bottom").removeClass("upload-hidden");
    });
    $(".item-paint").on('click',function(){
        $(".upload-item-bottom").addClass("upload-hidden");
    });


});

//跳转到个人中心
function delayerTopersonalCenter(){
    window.location = "/personalCenter.html";
}

//购买，输入密码错误
function passwordError(){
    prompt('密码错误','alert-info',3500);
}

//登录 账号或密码错误
function passwordOrAccountError(){
    prompt('账号或密码输入错误','alert-info',3500);
}
//登录 账号或密码错误
function registerSuccess(){
    prompt('注册成功','alert-info',3500);
}
//邮箱格式错误
function emailError(){
    prompt('邮箱格式错误','alert-info',3500);
}
//用户名已存在
function nameExistence(){
    prompt('用户名已存在','alert-info',3500);
}
//修改信息成功
function modifiedInformationSuccess(){
    prompt('修改成功','alert-info',3500);
}
//充值成功
function rechargeSuccee(){
    prompt('充值成功','alert-info',3500);
}
//移除收藏
function removeSuccess(){
    prompt('成功移除该藏品','alert-info',3500);
}
//下架商品成功
function offShelfGoodsSuccess(){
    prompt('成功下架','alert-info',3500);
}
//上传作品成功
function uploadSuccess(){
    prompt('上传成功','alert-info',3500);
}

//收藏
function collectionPro(){
    document.getElementsByClassName("product-collection")[0].addClass("product-collection-love");
}

//提示信息
var prompt = function (message, style, time)
{
    style = (style === undefined) ? 'alert-info' : style;
    time = (time === undefined) ? 1200 : time;
    $('<div>')
        .appendTo('body')
        .addClass('alert ' + style)
        .html(message)
        .show()
        .delay(time)
        .fadeOut();
};

//更换头像
//初始化
var initCropperInModal = function(img, input, modal){
    var $image = img;
    var $inputImage = input;
    var $modal = modal;
    var options = {
        aspectRatio: 1, // 纵横比
        viewMode: 2,
        preview: '.img-preview' // 预览图的class名
    };
    // 模态框隐藏后需要保存的数据对象
    var saveData = {};
    var URL = window.URL || window.webkitURL;
    var blobURL;
    $modal.on('show.bs.modal',function () {
        // 如果打开模态框时没有选择文件就点击“打开图片”按钮
        if(!$inputImage.val()){
            $inputImage.click();
        }
    }).on('shown.bs.modal', function () {
        // 重新创建
        $image.cropper( $.extend(options, {
            ready: function () {
                // 当剪切界面就绪后，恢复数据
                if(saveData.canvasData){
                    $image.cropper('setCanvasData', saveData.canvasData);
                    $image.cropper('setCropBoxData', saveData.cropBoxData);
                }
            }
        }));
    }).on('hidden.bs.modal', function () {
        // 保存相关数据
        saveData.cropBoxData = $image.cropper('getCropBoxData');
        saveData.canvasData = $image.cropper('getCanvasData');
        // 销毁并将图片保存在img标签
        $image.cropper('destroy').attr('src',blobURL);
    });
    if (URL) {
        $inputImage.change(function() {
            var files = this.files;
            var file;
            if (!$image.data('cropper')) {
                return;
            }
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {

                    if(blobURL) {
                        URL.revokeObjectURL(blobURL);
                    }
                    blobURL = URL.createObjectURL(file);

                    // 重置cropper，将图像替换
                    $image.cropper('reset').cropper('replace', blobURL);

                    // 选择文件后，显示和隐藏相关内容
                    $('.img-container').removeClass('hidden');
                    $('.img-preview-box').removeClass('hidden');
                    $('#changeModal .disabled').removeAttr('disabled').removeClass('disabled');
                    $('#changeModal .tip-info').addClass('hidden');

                    
                } else {
                    window.alert('请选择一个图像文件！');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).addClass('disabled');
    }
}
// 转换为Blob后显示在img标签中
var sendPhoto = function(){
    $('#photo').cropper('getCroppedCanvas',{
        width:300,
        height:300
    }).toBlob(function(blob){
        // 转化为blob后更改src属性，隐藏模态框
        $('#user-photo').attr('src',URL.createObjectURL(blob));
        $('#changeModal').modal('hide');
    });
}
// var sendPhoto = function () {
//     // 得到PNG格式的dataURL
//     var photo = $('#photo').cropper('getCroppedCanvas', {
//         width: 300,
//         height: 300
//     }).toDataURL('image/png');

//     $.ajax({
//         url: '上传地址', // 要上传的地址
//         type: 'post',
//         data: {
//             'imgData': photo
//         },
//         dataType: 'json',
//         success: function (data) {
//             if (data.status == 0) {
//                 // 将上传的头像的地址填入，为保证不载入缓存加个随机数
//                 $('.user-photo').attr('src', '头像地址?t=' + Math.random());
//                 $('#changeModal').modal('hide');
//             } else {
//                 alert(data.info);
//             }
//         }
//     });
// }

$(function(){
    initCropperInModal($('#photo'),$('#photoInput'),$('#changeModal'));
});

//登录后 显示用户名，去掉登录注册按钮，显示退出按钮
function changeID(){
    document.getElementById("sign-reg").innerHTML="用户名";
    document.getElementById("li-signup").style.display="none";
    document.getElementById("li-register").style.display="none";
    document.getElementById("dropdown-divider-hr").style.display="none";
    document.getElementById("li-exit").style.display="inline-block";
}
function searchChange(){
    document.getElementById("market-sidebar-col").style.display="none";
    document.getElementsByClassName("market-wrap")[0].style.padding = "0 0";

    var x = document.getElementsByClassName("market-product-items");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].style.width = "33.3333333333333%";
    }
}

var fileInput = document.getElementById('custom-upload-file'),
        previewImg = document.getElementById('upload-item-img');
fileInput.addEventListener('change', function () {
    var file = this.files[0];
    var reader = new FileReader();
    // 监听reader对象的的onload事件，当图片加载完成时，把base64编码賦值给预览图片
    reader.addEventListener("load", function () {
        previewImg.src = reader.result;
    }, false);
    // 调用reader.readAsDataURL()方法，把图片转成base64
    reader.readAsDataURL(file);
}, false);
