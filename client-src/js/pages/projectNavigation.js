import {
  unescapeData
} from '../vendors/tools/string'
import './base.js'

if (module.hot) {
  module.hot.accept()
}
const ProjectNavigationModel = function (data, id, isNext) {
  let self = this
  unescapeData(data, 'name')
  self.projects = ko.observableArray(data)
  self.isNext = ko.observable(isNext)

  let pageno = 1

  self.more = function () {
    pageno = pageno + 1
    $.ajax({
      method: 'GET',
      url: '/channel/navigation/projects/' + id + '?number=' + pageno,
      dataType: 'json'
    })
      .done(function (respones) {
        unescapeData(respones.projects, 'name')
        for (let project of respones.projects) {
          self.projects.push(project)
        }
        self.isNext(respones.isNext)
      })
  }
}

if ($('#projectNavigation').length) {
  const projectNavigationModel = new ProjectNavigationModel(data, id, isNext)
  ko.applyBindings(projectNavigationModel)
}
