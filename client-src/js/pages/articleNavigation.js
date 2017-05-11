import {
  unescapeData
} from '../vendors/tools/string'
import './base.js'

if (module.hot) {
  module.hot.accept()
}

const ArticleNavigationModel = function (data, id, isNext) {
  let self = this
  unescapeData(data, 'title')
  self.articles = ko.observableArray(data)
  self.isNext = ko.observable(isNext)

  let pageno = 1

  self.more = function () {
    pageno = pageno + 1
    $.ajax({
      method: 'GET',
      url: '/channel/navigation/articles/' + id + '?number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        unescapeData(respones.articles, 'title')
        for (let article of respones.articles) {
          self.articles.push(article)
        }
        self.isNext(respones.isNext)
      })
  }
}

if ($('#articleNavigation').length) {
  const articleNavigationModel = new ArticleNavigationModel(data, id, isNext)
  ko.applyBindings(articleNavigationModel)
}
