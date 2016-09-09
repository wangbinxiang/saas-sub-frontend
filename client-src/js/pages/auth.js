if (module.hot) {
    module.hot.accept()
}

import '../../../client-src/js/pages/base.js'

require.ensure([], function(require) {
    let masonry11 = require('../../../client/js/vendors/masonry.pkgd.min')
    let dropzone = require('../../../client/js/vendors/dropzone')   
    //var myDropzone = new dropzone("#drop", { url: "/file/post", dictDefaultMessage: "Drag Here"});
    dropzone.options.drop = {
        url: "/file/post",
        paramName: "file", // The name that will be used to transfer the file
        maxFilesize: 0.1, // MB
        dictDefaultMessage: "Drag Here",
        accept: function(file, done) {
            if (file.name == "justinbieber.jpg") {
                done("Naha, you don't.");
            }
            else { done(); }
        }
    };
})

console.log('2tyrs')




//Dropzone.options.drop = {
//    paramName: "file", // The name that will be used to transfer the file
//    maxFilesize: 2, // MB
//    accept: function(file, done) {
//        if (file.name == "justinbieber.jpg") {
//            done("Naha, you don't.");
//        }
//        else { done(); }
//    }
//};