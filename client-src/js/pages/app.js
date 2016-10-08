if (module.hot) {
    module.hot.accept();
}
$(document).foundation();
var lastScrollTop = 0;
if (Foundation.MediaQuery.current == 'small') {
    $(window).scroll(function (event) {
        var st = $(this).scrollTop();
        if (st > lastScrollTop && st > 60 && !$('#responsive-menu').is(':visible')) {
            $('#headerGlobal').addClass('hidee');
        } else {
            $('#headerGlobal').removeClass('hidee');
        }
        lastScrollTop = st;
    });
}

if($('#goodImgsUploader').length > 0){
    var goodImgsUploader = new Dropzone("div#goodImgsUploader", { url: "/file/upload" });
    var maxImageWidth = 1000, maxImageHeight = 1000;
    Dropzone.options.goodImgsUploader = {
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        init: function () {
            this.on("success", function (file, responseText) {
                file.previewTemplate.setAttribute('id', responseText[0].id);
            });
            this.on("thumbnail", function (file) {
                if (file.width < maxImageWidth || file.height < maxImageHeight) {
                    file.rejectDimensions()
                }
                else {
                    file.acceptDimensions();
                }
            });
        },
        accept: function (file, done) {
            file.acceptDimensions = done;
            file.rejectDimensions = function () { done("Image width or height too big."); };
        }
    };
    goodImgsUploader.on('success', function(file, responseText) {
        var htmlImg = 
            '<input type="hidden" name="slideShow[]" value="' + responseText.id + '" />';
        $('#goodImgsUploader').append(htmlImg); 
    });
}

if ($('#goodADsUploader').length > 0) {
    var goodADsUploader = new Dropzone("div#goodADsUploader", { url: "/file/upload" });
    var maxImageWidth = 1000, maxImageHeight = 1000;
    Dropzone.options.goodADsUploader = {
        url: "/file/upload",
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 2, // MB
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        init: function () {
            this.on("success", function (file, responseText) {
                file.previewTemplate.setAttribute('id', responseText[0].id);
            });
            this.on("complete", function() {
            })
            this.on("thumbnail", function (file) {
                if (file.width < maxImageWidth || file.height < maxImageHeight) {
                    file.rejectDimensions()
                }
                else {
                    file.acceptDimensions();
                }
            });
        },
        complete: function() {
        },
        accept: function (file, done) {
            file.acceptDimensions = done;
            file.rejectDimensions = function () { done("Image width or height too big."); };
        }
    };
    goodADsUploader.on('success', function(file, responseText) {
        $('#goodADsUploader').hide();
        var htmlImg = '<div class="good-desc-img">' +
            '<img src="' + responseText.url + '" />' +
            '<input type="hidden" name="description[img][]" value="' + responseText.id + '" />' +
            '<button class="button" type="button" onclick="confirm(\'are you sure?\')"><span aria-hidden="true">&times;</span></button>' +
        '</div>';
        $('#goodDescWrap').append(htmlImg);        
    });
}

function auto_grow(element) {
    //element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

$('#goodDescImgNew').click(function(){
    goodADsUploader.removeAllFiles();
    $('#goodADsUploader').show().trigger('click');
})

$('#goodDescTextNew').click(function(){
    var htmlText = '<div class="good-desc-text">' +
            '<input type="text" name="description[subtitle][]" placeholder="subtitle here" class="input-unstyle">' +
                '<textarea class="textAuto" name="description[text][]" n onkeyup="auto_grow(this)" placeholder="text here"></textarea>' +
            '<button class="button" type="button" onclick="$(this).parent().remove()"><span aria-hidden="true">&times;</span></button>'+
        '</div>'
    $('#goodDescWrap').append(htmlText); 
})

$('#editPrice .data-close').click(function(){
    $('#editPrice').foundation('close');
})

$('#addPrice').click(function () {
    resetEditPrice();
    $('#editPrice').foundation('open')
})

$('#savePrice').click(function () {
    $('#formEditPrice').foundation('validateForm');
    if (!$('#formEditPrice .formErrorAlert').is(':visible')) {
        var specification = $('#priceName').val();
        var price = $('#priceValue').val();
        var productId = $('#productId').val();
        var editPriceId = $('#editPriceId').val();
        var url = '/front/admin/addPrice';
        var data = {
            specification: specification,
            price: price,
            productId: productId
        };
        if (editPriceId) {
            data.editPriceId = editPriceId;
            url = '/front/admin/editPrice';
        } 
        $.ajax({
            url: url,
            method: 'post',
            data: data,
            success: function(data) {
                if (data.id) {
                    htmlPrice = '<tr><td data-th="规格名称">' + $('#priceName').val() + '</td>' +
                                            '<td data-th="单价">￥' + $('#priceValue').val() + '</td>' +
                                            '<td><button class="button small edit-price">编辑</button> <button data-id="' + data.id + '" class="button small del-price">删除</button></td>' + 
                                        '</tr>';
                    $('#priceList').append(htmlPrice);
                    $('#editPrice').foundation('close');
                };
            }
        });

    }
})

function resetEditPrice(){
    $('#formEditPrice').foundation('resetForm').find('input').val('');
}

$('#priceList').on('click', '.edit-price', function () {
    resetEditPrice()
    $('#editPrice').foundation('open');
})

$('#priceList').on('click', '.del-price', function () {
    var isConfirm = confirm('确认删除？');
    var _this = this;
    if (isConfirm) {
        var productId = $('#productId').val();
        var priceId = $(this).attr('data-id');
        var data = {
            productId: productId,
            priceId: priceId
        }
        $.ajax({
            url: '/front/admin/delPrice',
            method: 'post',
            data: data,
            success: function(data) {
                $(_this).parent().parent().remove();
            }
        }); 
    };
})




if ($('div#authorizationCertificatePic').length > 0) {
    var authorizationCertificatePicUploader = new Dropzone("div#authorizationCertificatePic", { url: "/file/upload" });
    var maxImageWidth = 1000, maxImageHeight = 1000;
    Dropzone.options.authorizationCertificatePicUploader = {
        paramName: "file", // The name that will be used to transfer the file
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
    };
    authorizationCertificatePicUploader.on('success', function (file, responseText) {
        $('#authorizationCertificatePicId').val(responseText.id);
    });

    var recordRegistrationPicUploader = new Dropzone("div#recordRegistrationPic", { url: "/file/upload" });
    Dropzone.options.recordRegistrationPicUploader = {
        paramName: "file", // The name that will be used to transfer the file
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
    };
    recordRegistrationPicUploader.on('success', function (file, responseText) {
        $('#recordRegistrationPicId').val(responseText.id);
    });

    var businessLicenseCertificatePicUploader = new Dropzone("div#businessLicenseCertificatePic", { url: "/file/upload" });
    Dropzone.options.businessLicenseCertificatePicUploader = {
        paramName: "file", // The name that will be used to transfer the file
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
    };
    businessLicenseCertificatePicUploader.on('success', function (file, responseText) {
        $('#businessLicenseCertificatePicId').val(responseText.id);
    });

    var identifyCardFrontPhotoUploader = new Dropzone("div#identifyCardFrontPhoto", { url: "/file/upload" });
    Dropzone.options.identifyCardFrontPhotoUploader = {
        paramName: "file", // The name that will be used to transfer the file
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
    };
    identifyCardFrontPhotoUploader.on('success', function (file, responseText) {
        $('#identifyCardFrontPhotoId').val(responseText.id);
    });

    var identifyCardBackPhotoUploader = new Dropzone("div#identifyCardBackPhoto", { url: "/file/upload" });
    Dropzone.options.identifyCardBackPhotoUploader = {
        paramName: "file", // The name that will be used to transfer the file
        dictDefaultMessage: "Drag files or click here",
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
    };
    identifyCardBackPhotoUploader.on('success', function (file, responseText) {
        $('#identifyCardBackPhotoId').val(responseText.id);

    });
}

$('#valPass, #valFail').on('change', function () {
    $('.hideFail').toggle();
})


$('#applyUser').on('click', function() {
    switch($('input[name="pokemon"]:checked').val()) {
        case 'approve':
            var id = $('#id').val();
            location.href = '/admin/approve/' + id;
            break;
    }
});

var productOnOff = (function(){
    var idList = {};
    return function(id, status) {
        if (isFinite(idList[id])) {
            status = idList[id];
        } else {
            idList[id] = status
        }
        var url = '';
        switch(status) {
            case 0:
                url = '/front/admin/product/on';
                break;
            case 2:
                url = '/front/admin/product/off';
                break;
        }
        var data = {
            id: id
        }

        $.ajax({
            url: url,
            method: 'post',
            data: data,
            success: function(data) {
                switch(status) {
                    case 0:
                        idList[id] = 2;
                        $('#OnOff' + id).text('下架');
                        break;
                    case 2:
                        idList[id] = 0;
                        $('#OnOff' + id).text('上架');
                        break;
                }
            }
        });
        //如果 列表里有 id 状态改为列表多
        //
        //
        //
    }
})()