if (module.hot) {
    module.hot.accept()
}

import './base.js';

const ProdModel = function(data, productTypeId){
    // var arrData = $.map(data, function(value, index) {
    //     return [value];
    // });
    
    let self = this
    self.prods = ko.observableArray(data);
    self.isNext = ko.observable(isNext);

    let pageno = 1;
    self.more = function() {
       pageno = pageno + 1;
       $.ajax({
           method: "GET",
           url: "/channel/productTypes/" + productTypeId + "?number=" + pageno,
           dataType: "json"
       })
       .done(function(respones) {
           // const products = $.map(respones.products, function(value, index) {
           //     return [value];
           // });
           for(let product of respones.products){
               self.prods.push(product)
           }
           self.isNext(respones.isNext);
           // new Foundation.Equalizer($('#listEqualizer'));
           Foundation.reInit($('#listEqualizer'));
       })
    }
}

function koBind(data, productTypeId) {
	const prodModel = new ProdModel(data, productTypeId);
	ko.applyBindings(prodModel);

  if(prodModel.prods().length > 1){
      require.ensure([], function(require) {
          let imagesLoaded = require('imagesloaded')
          new imagesLoaded($('#listEqualizer'), function(){
              var equalizer = new Foundation.Equalizer($('#listEqualizer'));
          });
      })
  }
}
if ($('#listEqualizer').length) {
  koBind(data, productTypeId);  
}


const ArticlesModel = function(data, categoryId) {
  let self = this
  self.articles = ko.observableArray(data);
  self.isNext = ko.observable(isNext);

  let pageno = 1;

  self.more = function() {
     pageno = pageno + 1;
     $.ajax({
         method: "GET",
         url: "/channel/categories/" + categoryId + "?number=" + pageno,
         dataType: "json"
     })
     .done(function(respones) {
         for(let article of respones.articles){
             self.articles.push(article)
         }
         self.isNext(respones.isNext);
     })
  }
}

if ($('#articles').length) {
  const articlesModel = new ArticlesModel(data, categoryId); 
  ko.applyBindings(articlesModel);
   
}