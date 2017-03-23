if (module.hot) {
    module.hot.accept()
}

import './base.js'
import '../vendors/ko.bindingHandlers'

//回复列表模型
const RepliesModel = function(data, hostId, applicantId) {
    this.replies = ko.observableArray(data)
    this.isNext = ko.observable(false);
    this.hostId = hostId;
    this.files
    this.applicantId = applicantId;
}

const repliesModel = new RepliesModel(null, hostId, applicantId)
if (document.getElementById('replies')) {
    ko.applyBindings(repliesModel, document.getElementById('replies'))
}

$.ajax({
    method: 'GET',
    url: '/applications/' + applicationId + '/replies',
    dataType: "json",
}).done(function(respone) {
    if (respone.replies) {
        for(let reply of respone.replies){
            // reply.content[0] = nl2br(reply.content[0].replace(/ /g, '&nbsp;'));
            repliesModel.replies.push(reply)
        }
    }
    repliesModel.isNext(respone.isNext);
    // alert('提交成功');
    // location.reload();
    // location.href = '/projects/' + response.id + '/prices';
})

//回复框模型
const ReplyModel = function() {
    const self = this
    this.content = ko.observable('')
    this.files = ko.observableArray([])
    this.submit = ko.observable(false)

    this.addFile = function(id){
        self.files.push(id)
    }

    this.removeFile = function(idx) {
        self.files.splice(idx, 1)
    }
}

if (document.getElementById('formReply')) {
    const replyModel = new ReplyModel()
    ko.applyBindings(replyModel, document.getElementById('formReply'))

    $('#replayButton').on('click', () => {
        Foundation.reInit($('#formReply'));
        $('#formReply').foundation('validateForm');


        if($('[data-invalid]').length === 0){
            replyModel.submit(true)
            $('#replayButton').text('正在发布回复')

            const _csrf = $('#_csrf').val()
            const content = replyModel.content()
            const files = replyModel.files()

            $.ajax({
                method: 'POST',
                url: '/applications/' + applicationId + '/replies',
                dataType: "json",
                data: { _csrf, content, files }
            })
            .done(function(response) {
                alert('提交成功');
                location.reload();
                // location.href = '/projects/' + response.id + '/prices';
            })
            .fail(function(response){
                alert('提交失败！');
                replyModel.submit(false);
                $('#replayButton').text('发布回复')
            })
        } else {
            $(window).scroll();
        }

        return false
    });

    if (document.getElementById('attachmentUploader')) {
        require.ensure([], function(require) {
            let dropzone = require('../vendors/dropzone.js')
            let key_tokens = [];
            let attachmentUploaderRemovedIndex
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
                        const key = applicationId + '-' + 'replay' + '-' + repliesModel.replies().length + '-' + file.name
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
                        replyModel.addFile(response.key)
                        this.processQueue();                
                    })
                    this.on("complete", (file) => {                
                        
                    })
                    this.on('removedfile', function(file){
                        if($(file.previewElement).hasClass('dz-complete')){
                            replyModel.removeFile(attachmentUploaderRemovedIndex)
                        }
                    })
                }
            });
        })  
    }
}

//合同模型
const ContractModel = function(contarct) {
    const self = this
    this.id = ko.observable(contarct == null ? '' : contarct.id)
    this.time = ko.observable(contarct == null ? '' : contarct.time)
    this.address = ko.observable(contarct == null ? '' : contarct.address)
    this.price = ko.observable(contarct == null ? '' : contarct.price)
    this.isOnlinePay = ko.observable(contarct == null ? false : contarct.isOnlinePay)
    this.pdfs = ko.observableArray(contarct == null ? [] : contarct.attachments)
    this.button = ko.observable(false)

    this.addPdf = function(id) {
        self.pdfs.push(id)
        $('#formContracts').foundation('validateInput', $('#pdfIds'))
    }

    this.removePdf = function(idx) {
        self.pdfs.splice(idx, 1)
    }
}

const contractModel = new ContractModel(applicationContract)
if (document.getElementById('formContracts')) {
    ko.applyBindings(contractModel, document.getElementById('formContracts'));  
}
if (document.getElementById('contractInfo')) {
    ko.applyBindings(contractModel, document.getElementById('contractInfo'));
}


const contractFormButton = {
    submit: ko.observable(false)
}
if (document.getElementById('contractFormButton')) {
    ko.applyBindings(contractFormButton, document.getElementById('contractFormButton'))
}

$('#approveButton').on('click', () => {
    $('#contractForm').foundation('validateForm');
    if($('[data-invalid]').length === 0){
        if(confirm('确定同意该方案？')){
            contractFormButton.submit(true)
            $('#approveButton').text('正在同意方案')

            const _csrf = $('#_csrf').val()

            $.ajax({
                method: 'PUT',
                url: '/applications/' + applicationId + '/approve',
                dataType: "json",
                data: { _csrf }
            })
            .done(function(response) {
                alert('提交成功');
                location.reload();
                // location.href = '/projects/' + response.id + '/prices';
            })
            .fail(function(response){
                alert('提交失败！');
                contractFormButton.submit(false);
                $('#approveButton').text('同意方案')
            })
        } else {
            $(window).scroll();
        }
    }

    return false
});

$('#declineButton').on('click', () => {

    if(confirm('确定结束申请？')){
        contractFormButton.submit(true)
        $('#declineButton').text('正在结束申请')

        const _csrf = $('#_csrf').val()

        $.ajax({
            method: 'PUT',
            url: '/applications/' + applicationId + '/decline',
            dataType: "json",
            data: { _csrf }
        })
        .done(function(response) {
            alert('提交成功');
            location.reload();
            // location.href = '/projects/' + response.id + '/prices';
        })
        .fail(function(response){
            alert('提交失败！');
            contractFormButton.submit(false);
            $('#declineButton').text('结束申请')
        })
    } else {
        $(window).scroll();
    }

    return false
});



