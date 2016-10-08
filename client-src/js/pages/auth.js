if (module.hot) {
    module.hot.accept()
}

import 'foundation-sites'
$(document).foundation();
Foundation.Abide.defaults.patterns['psw_complexity'] = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
// ^                         Start anchor
// (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
// (?=.*[!@#$&*])            Ensure string has one special case letter.
// (?=.*[0-9].*[0-9])        Ensure string has two digits.
// (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
// .{8}                      Ensure string is of length 8.
// $                         End anchor.

$('#btnCode').on('click', () => {
    $('#formReg').foundation('validateInput', $('#cellPhone'));
    if($('#cellPhone').is('[data-invalid]')){    
        $('#formReg').foundation('addErrorClasses', $('#cellPhone'));
    } else{
        var request = '/register/verification-code/?cellPhone=' + $('#cellPhone').val()
        fetch(request, {
            method: 'get'
        }).then(function(response) {
            $('#codeSentNote').show()
        }).catch(function(err) {
        })
    }
})

$('#btnReg').on('click', () => {
    $('#formReg').foundation('validateForm');
    if($('#codeInput').is('[data-invalid]')){    
        $('#formReg').foundation('addErrorClasses', $('#codeInput'));
    }
    if($('[data-invalid]').length === 0){
        fetch('/register', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/JSON'
            }),
            body: JSON.stringify({
                cellPhone: $('[name="cellPhone"]').val(),
                password: $('[name="password"]').val(),
                rePassword: $('[name="rePassword"]').val(),
                code: $('[name="code"]').val()
            })
        }).then(function(response) {
            console.log(response)
            $('#formCallout').show();
            $('#codeInputNote span').toggleClass('blkHide')
            $('#formReg').foundation('addErrorClasses', $('#codeInput'));
            
        }).catch(function(err) {
            //console.log(err.body)
        })
    } else{
        return false;
    }
    return false;
})

require.ensure([], function(require) {

})




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