import {
  unescapeData
} from '../vendors/tools/string'
import './base.js'
import jQueryBridget from 'jquery-bridget'
import Masonry from 'masonry-layout'

if (module.hot) {
  module.hot.accept()
}

jQueryBridget('masonry', Masonry, $)

const ProdModel = function (data, productTypeId) {
  // var arrData = $.map(data, function(value, index) {
  //     return [value];
  // });
  unescapeData(data, 'name')
  let self = this
  self.prods = ko.observableArray(data)
  self.isNext = ko.observable(isNext)

  this.afterAdd = function (element) {
    // $('#masonryWrap').masonry('appended', element).masonry();
    Foundation.onImagesLoaded($('#masonryWrap img'), function () {
      $('#masonryWrap').masonry('appended', element).masonry()
    })
  }

  let pageno = 1
  self.more = function () {
    pageno = pageno + 1
    $.ajax({
      method: 'GET',
      url: '/channel/productTypes/' + productTypeId + '?number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        // const products = $.map(respones.products, function(value, index) {
        //     return [value];
        // });
        unescapeData(respones.products, 'name')
        for (let product of respones.products) {
          self.prods.push(product)
        }
        self.isNext(respones.isNext)
      })
  }
}

function koBind (data, productTypeId) {
  const prodModel = new ProdModel(data, productTypeId)
  ko.applyBindings(prodModel)

  //   if(prodModel.prods().length > 1){
  //       require.ensure([], function(require) {
  //           let imagesLoaded = require('imagesloaded')
  //           new imagesLoaded($('#listEqualizer'), function(){
  //               var equalizer = new Foundation.Equalizer($('#listEqualizer'));
  //           });
  //       })
  //   }

  Foundation.onImagesLoaded($('#masonryWrap img'), function () {
    $('#masonryWrap').masonry({
      // options
      itemSelector: '.column',
      percentPosition: true
    })
  })
}
if ($('#masonryWrap').length) {
  koBind(data, productTypeId)
}

const ArticlesModel = function (data, categoryId) {
  let self = this
  self.articles = ko.observableArray(data)
  self.isNext = ko.observable(isNext)

  let pageno = 1

  self.more = function () {
    pageno = pageno + 1
    $.ajax({
      method: 'GET',
      url: '/channel/categories/' + categoryId + '?number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        for (let article of respones.articles) {
          self.articles.push(article)
        }
        self.isNext(respones.isNext)
      })
  }
}

if ($('#articles').length) {
  const articlesModel = new ArticlesModel(data, categoryId)
  ko.applyBindings(articlesModel)
}

const ProjectsModel = function (data, projectTypeId) {
  let self = this
  self.projects = ko.observableArray(data)
  self.isNext = ko.observable(isNext)

  let pageno = 1

  self.more = function () {
    pageno = pageno + 1
    $.ajax({
      method: 'GET',
      url: '/channel/projectTypes/' + projectTypeId + '?number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        for (let project of respones.projects) {
          self.projects.push(project)
        }
        self.isNext(respones.isNext)
      })
  }
}

if ($('#projects').length) {
  const projectsModel = new ProjectsModel(data, projectTypeId)
  ko.applyBindings(projectsModel)
}
