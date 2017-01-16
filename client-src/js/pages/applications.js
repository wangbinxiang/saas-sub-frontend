if (module.hot) {
    module.hot.accept()
}

import './base.js'

const ApplicationsModel = function(applications){
    let self = this
    self.applications = ko.observableArray(applications)
    self.isNext = ko.observable(isNext)

    self.more = function(){
        pageNo += 1
        $.ajax({
            method: "GET",
            url: "/applications?number=" + pageNo + (flag? '&flag=1': ''),
            dataType: "json"
        })
        .done(function(respones) {
            if (respones.applications) {
                for(let application of respones.applications){
                    self.applications.push(application)
                }
            }
            self.isNext(respones.isNext);
        })
        .fail(function(response){
            
            
        })
    }
}
let applicationsModel = new ApplicationsModel(data);
ko.applyBindings(applicationsModel, document.getElementById('applicationsWrap'));
