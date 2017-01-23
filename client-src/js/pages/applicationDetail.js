if (module.hot) {
    module.hot.accept()
}

import './base.js'


const formButton = {
    submit: ko.observable(false)
}
if (document.getElementById('formButton')) {
    ko.applyBindings(formButton, document.getElementById('formButton'))
}

const RepliesModel = function(data, hostId, applicantId) {
    this.replies = ko.observableArray(data)
    this.isNext = ko.observable(false);
    this.hostId = hostId;
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
            repliesModel.replies.push(reply)
        }
    }
    repliesModel.isNext(respone.isNext);
    // alert('提交成功');
    // location.reload();
    // location.href = '/projects/' + response.id + '/prices';
})


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
    require.ensure([], function(require) {
        let dropzone = require('../vendors/dropzone.js')
        let key_tokens = [];
        $('#contractsUploader').dropzone({
            url: imgUploadUrl,
            maxFilesize: 50, // MB
            addRemoveLinks: true,
            maxFiles: 5,
            parallelUploads: 1,
            acceptedFiles: ".pdf",
            autoProcessQueue : false,
            init: function () {
                this.on('addedfile', function(file){
                    var that = this;
                    const key = projectId + '-' + applicationId + '-' + file.name
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
                    contractModel.addPdf(response.key)
                    this.processQueue();                
                })
                this.on("complete", (file) => {                
                    
                })
                this.on('removedfile', function(file){
                    if($(file.previewElement).hasClass('dz-complete')){
                        var idx = $(file.previewElement).index()
                        contractModel.removePdf(idx)
                    }
                })
            }
        });

        for (let contract of contractModel.pdfs()) {
            let mockFile = { name: contract, accepted: true};
            contractsUploader.dropzone.files.push(mockFile)
            contractsUploader.dropzone.emit("addedfile", mockFile);
            contractsUploader.dropzone.emit("thumbnail", mockFile, imgHost + contract);
            contractsUploader.dropzone.emit("complete", mockFile);
        }
    })  
}
if (document.getElementById('contractInfo')) {
    ko.applyBindings(contractModel, document.getElementById('contractInfo'));
}






console.log(imgUploadUrl)

if (document.getElementById('attachmentUploader')) {
    //ko.applyBindings(contractModel, document.getElementById('formContracts'));  
    require.ensure([], function(require) {
        let dropzone = require('../vendors/dropzone.js')
        let key_tokens = [];
        $('#attachmentUploader').dropzone({
            url: 'imgUploadUrl',
            maxFilesize: 50, // MB
            addRemoveLinks: true,
            maxFiles: 5,
            parallelUploads: 1,
            acceptedFiles: ".rar, .zip, .jpg",
            autoProcessQueue : false,
            init: function () {
                this.on('addedfile', function(file){
                    var that = this;
                    const key = projectId + '-' + applicationId + '-' + file.name
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
                    contractModel.addPdf(response.key)
                    this.processQueue();                
                })
                this.on("complete", (file) => {                
                    
                })
                this.on('removedfile', function(file){
                    if($(file.previewElement).hasClass('dz-complete')){
                        var idx = $(file.previewElement).index()
                        contractModel.removePdf(idx)
                    }
                })
            }
        });
    })  
}












$('#approveButton').on('click', () => {
    $('#contractForm').foundation('validateForm');
    if($('[data-invalid]').length === 0){
        if(confirm('确定同意该方案？')){
            formButton.submit(true)
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
                formButton.submit(false);
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
        formButton.submit(true)
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
            formButton.submit(false);
            $('#declineButton').text('结束申请')
        })
    } else {
        $(window).scroll();
    }

    return false
});


$('#replayButton').on('click', () => {
    Foundation.reInit($('#formReply'));
    $('#formReply').foundation('validateForm');


    if($('[data-invalid]').length === 0){
        formButton.submit(true)
        $('#replayButton').text('正在发布回复')

        const _csrf = $('#_csrf').val()
        const content = $('#content').val()

        $.ajax({
            method: 'POST',
            url: '/applications/' + applicationId + '/replies',
            dataType: "json",
            data: { _csrf, content }
        })
        .done(function(response) {
            alert('提交成功');
            location.reload();
            // location.href = '/projects/' + response.id + '/prices';
        })
        .fail(function(response){
            alert('提交失败！');
            formButton.submit(false);
            $('#replayButton').text('正在发布回复')
        })
    } else {
        $(window).scroll();
    }

    return false
});

