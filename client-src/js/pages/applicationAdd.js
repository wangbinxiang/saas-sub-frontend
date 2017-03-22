if (module.hot) {
    module.hot.accept()
}

import './base.js'
import md5 from 'md5'


let formButton = {
    submit: ko.observable(false)
}

ko.applyBindings(formButton, document.getElementById('formButton'));


const Attachments = function () {

    this.attachments = []
    const self = this

    this.addAttachment = function(id){
        self.attachments.push(id)
    }

    this.removeAttachment = function(idx) {
        self.attachments.splice(idx, 1)
    }
}

const attachments = new Attachments()

if (document.getElementById('attachmentUploader')) {
    require.ensure([], function(require) {
        let dropzone = require('../vendors/dropzone.js')
        let key_tokens = [];
        let attachmentUploaderRemovedIndex;
        $('#attachmentUploader').on('mousedown', '.dz-remove', function() {
            attachmentUploaderRemovedIndex = $(this).parents('div').index()-1
        })
        $('#attachmentUploader').dropzone({
            url: imgUploadUrl,
            maxFilesize: 50, // MB
            addRemoveLinks: true,
            maxFiles: 5,
            parallelUploads: 1,
            acceptedFiles: ".rar, .zip, .pdf, .word",
            autoProcessQueue : false,
            init: function () {
                this.on('addedfile', function(file){
                    var that = this;
                    const key = 'projects-' + projectId + '-' + md5(Math.random()).substr(0, 6) + '-' + file.name
                    $.ajax({
                        method: "GET",
                        dataType: "json",
                        url: "/attachments/token",
                        data: { key }
                    })
                    .done(function(respones) {
                        key_tokens.push({ key:respones.key, token:respones.token })
                        that.processQueue();
                    })
                    .fail(function(respones){
                        alert('error to get upload config')
                    })
                });

                this.on('sending', function(file, xhr, formData){
                    formData.append('key', key_tokens[0].key);
                    formData.append('token', key_tokens[0].token);
                    key_tokens.shift()
                })

                this.on('success', function(file, response){
                    attachments.addAttachment(response.key)
                    this.processQueue();                
                })
                this.on("complete", (file) => {                
                    // if($('#attachmentUploader .dz-complete.dz-success').length == 1){
                    //     $(file.previewElement).addClass('good-thumb')
                    // }
                })
                this.on('removedfile', function(file){
                    if($(file.previewElement).hasClass('dz-complete')){
                        attachments.removeAttachment(attachmentUploaderRemovedIndex)
                    }
                })
            }
        });
    })  
}

$('#saveGood').on('click', () => {
    Foundation.reInit($('#formGood'));
    $('#formGood').foundation('validateForm');

    if($('[data-invalid]').length === 0){
        formButton.submit(true);
        $('#saveGood').text('正在提交申请')
     
		const _csrf              = $('#_csrf').val()
		const projectId          = $('#projectId').val()
		const priceIndex         = $('#priceIndex').val()
		const realName           = $('#realName').val()
		const contactPhone       = $('#contactPhone').val()
		const identifyCardNumber = $('#identifyCardNumber').val()
		const companyName        = $('#companyName').val()
		const companyAddress     = $('#companyAddress').val()
		const information        = [$('#information').val(), attachments.attachments]//申请信息和附件

        $.ajax({
            method: 'POST',
            url: '/applications',
            dataType: "json",
            data: { _csrf, projectId, priceIndex, realName, contactPhone, identifyCardNumber, companyName, companyAddress, information }
        })
        .done(function(response) {
            alert('提交成功');
            location.href = '/applications/' + response.id;
        })
        .fail(function(response){
            alert('提交失败！');
            formButton.submit(false);
            $('#saveGood').attr('disabled', false)
            $('#saveGood').text('确认并提交申请')
            $('#formAlert').show()
        })
    } else {
        // $(window).scroll();
        $("html, body").animate({ scrollTop: $('.is-invalid-label, is-invalid-input').eq(0).offset().top });
    }

    return false
})