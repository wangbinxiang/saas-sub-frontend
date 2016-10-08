if (module.hot) {
    module.hot.accept()
}

import '../../../client-src/js/pages/base.js'
import {dropzone} from '../../../client-src/js/vendors/dropzone.js'

let GoodModel = function(good) {
    let self = this
    self.title = ko.observable(good == null ? '' : good.name) 
    self.imgs = ko.observableArray(good == null ? '' : good.slideIds)
    self.imgurls = good == null ? '' : good.slides
    //self.labels = ko.observableArray(good.labels)
    self.desc = ko.observable(good == null ? '' : good.feature)
    self.details = ko.observableArray(good == null ? '' : good.description)
    
    self.addImg = function(id){
        self.imgs.push(id)
        $('#formGood').foundation('validateInput', $('#imageIds'));
    }

    self.removeImg = function(idx) {
        self.imgs.splice(idx, 1)
    };

    self.addImage = function(id, url, idx) {
        let image = {}
        image.type = "image"
        image.value = {"id": id, "url": url}
        self.details.splice(idx, 0, image) 
    };

    self.addText = function(idx) {
        let text = {}
        text.type = "text"
        text.value = {"title": "", "desc": "", isAlert: false}
        self.details.splice(idx, 0, text)
        return false
    };
 
    self.remove = function(idx) {
        self.details.splice(idx, 1)
    };
};

let goodModel = new GoodModel(data)
ko.applyBindings(goodModel)

const htmlChecked = '<div class="goodImgsUploader-check"><svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">      <title>Check</title>      <defs></defs>      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#444444" fill-opacity="0.816519475" fill="#FFC107" sketch:type="MSShapeGroup"></path></g></svg></div>'
require.ensure([], function(require) {
    let autosize = require('autosize')
    let imagesLoaded = require('imagesloaded')
    imagesLoaded.makeJQueryPlugin($)
    autosize($('.textAuto'))
    var minImageWidth = 1000
    var goodImgsUploader = new dropzone("div#goodImgsUploader", {
        url: '/attachments/',
        method: 'POST',
        paramName: "file",
        maxFilesize: 4, // MB
        addRemoveLinks: true,
        maxFiles: 5,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        init: function () {
            this.on('success', function(file, response){
                goodModel.addImg(response.attachmentList[0].id)
                $(file.previewElement).append(htmlChecked)
            })
            this.on("complete", (file) => {                
                if($('#goodImgsUploader .dz-complete.dz-success').length == 1){
                    $(file.previewElement).addClass('good-thumb')
                }
            })
            this.on('removedfile', function(file){
                if($(file.previewElement).hasClass('dz-success')){
                    var idx = $(file.previewElement).index()
                    goodModel.removeImg(idx)
                    if($(file.previewElement).hasClass('good-thumb') && $('#goodImgsUploader .dz-complete').length > 0){
                        $('#goodImgsUploader .dz-complete:eq(0)').addClass('good-thumb')
                    }
                }
            })
        }
    });

    for (let img of goodModel.imgs()) {
        let mockFile = { name: goodModel.imgurls[img].url, accepted: true};
        goodImgsUploader.files.push(mockFile)
        goodImgsUploader.emit("addedfile", mockFile);
        goodImgsUploader.emit("thumbnail", mockFile, goodModel.imgurls[img].url);
        goodImgsUploader.emit("complete", mockFile);
    } 

    let setGoodImgDefault = (idx) => {
        $('#goodImgsUploader .dz-complete').append(htmlChecked).addClass('dz-success').eq(0).addClass('good-thumb')
    }

    setGoodImgDefault(0)

    $('#goodImgsUploader').on('click', '.dz-complete', function() {
        if (!$(this).hasClass('good-thumb') && !$(this).hasClass('dz-error')) {
            $(this).addClass('good-thumb').siblings('.good-thumb').removeClass('good-thumb')
        }
    })







    

    let points = getPoints()
    let scrollHeight = window.pageYOffset + 100, scrollScreen = scrollHeight + window.innerHeight
    let insertPoint = 0;

    var goodDescImgUploader = new dropzone("#goodDescImgUploader", {
        url: '/attachments/',
        method: 'POST',
        maxFilesize: 4, // MB
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        maxFiles: 1,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        init: function () {
            this.on("addedfile", function () {
                if (this.files.lenth == 2) {
                    this.removeFile(this.files[0]);
                } else{
                    $('#goodDescImgUploader').show()
                }              
            })
            this.on("error", function (file) {                
                
            })
            this.on("success", (file, response) => {
                //file.previewTemplate.setAttribute('id', responseText[0].id);
                //let point = getPoint();
                goodModel.addImage(response.attachmentList[0].id, response.attachmentList[0].url, insertPoint)
                $('#goodDescImgUploader').hide();
                this.removeFile(this.files[0]);
                $('#goodDescWrap').imagesLoaded(function(){
                    scrollHeight = window.pageYOffset + 200, scrollScreen = scrollHeight + window.innerHeight
                    //console.log(points, scrollHeight, scrollScreen, getPoint())
                    setPoint()
                });
            })
        }
    });

    $('#goodDescImgNew').click(function () {
        $('#goodDescImgUploader').trigger('click');
        insertPoint = getPoint();
        return false;
    })

    $('#goodDescTextNew').click(function () {
        insertPoint = getPoint();
        goodModel.addText(insertPoint)
        let domText = $('#goodDescWrap > section:eq(' + insertPoint + ') .textAuto')
        autosize(domText)
        domText.on('autosize:resized', function () {
            scrollHeight = window.pageYOffset + 160, scrollScreen = scrollHeight + window.innerHeight
            //console.log(points, scrollHeight, scrollScreen, getPoint())
            setPoint()
        })
        points = getPoints()
        Foundation.reInit($('#formGood'));
        return false;
    })

    function getPoints() {
        let points = new Array()
        $('#goodDescWrap > section').each((idx, ele) => {
            points.push($(ele).offset().top)
        })
        return points
    }

    function getPoint() {
        let isPoint = false, i = 0, len = points.length
        do {
            if (points[0] >= scrollScreen || points[len] <= scrollHeight || i == len) {
                i = -1
            } else if (points[i] > scrollHeight && points[i] < scrollScreen) {
                isPoint = true
            } else {
                i++
            }
        }
        while (!isPoint && i > -1)
        return i
    }

    function setPoint() {
        points = getPoints()
        let point = getPoint()
        if (point > -1) {
            let pos = $('#goodDescWrap > section:eq(' + point + ')').position()
            $('#goodDescAdd').css('top', Math.round(pos.top - 40))
        }
    }

    window.onscroll = () => {
        scrollHeight = window.pageYOffset + 200, scrollScreen = scrollHeight + window.innerHeight
        //console.log(points, scrollHeight, scrollScreen, getPoint())
        setPoint()
    }

    window.onresize = () => {
        setPoint()
    }

    $('#goodDescWrap').on('click', '.good-desc-remove', function () {
        var idx = $(this).parent().index()
        goodModel.remove(idx)
        scrollHeight = window.pageYOffset + 160, scrollScreen = scrollHeight + window.innerHeight
        //console.log(points, scrollHeight, scrollScreen, getPoint())
        setPoint()
        if($(this).parent().hasClass('good-desc-text')){
            Foundation.reInit($('#formGood'));
        }
        return false
    })

    $('#goodDescWrap').on('change', '.isAlert', function(){
        $(this).parent().toggleClass('isAlert')
    })
})

$('#saveGood').on('click', () => {
    $('#formGood').foundation('validateForm');
    let name = goodModel.title; //string
    let feature = goodModel.desc; //string
    let productType = 3;// integer
    let description = goodModel.details();//[]
    let slides = goodModel.imgs()
    let method = data == null ? 'POST' : 'PUT'
    let url = data == null ? '/products' : '/products/' + data.id

    for (let desc of description){
        if(desc.type === "image"){
            delete desc.value["url"]
        }
    }

    if($('[data-invalid]').length === 0){
        $.ajax({
            method: method,
            url: url,
            data: { name:name, feature:feature, productType:productType, description:description, slides:slides }
        })
        .done(function(response) {
            alert('提交成功');
            location.href = '/products/' + response.id + '/prices';
        })
        .fail(function(response){
            $('#formAlert').show()
        })
    }

    return false
})