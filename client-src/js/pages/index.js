import 'foundation-sites'

if (module.hot) {
    module.hot.accept()
}

import '../../../client-src/js/pages/base.js'

$('#btnLogin').on('click', function(){
    $('#formLogin').foundation('validateForm');
    if($('[data-invalid]').length === 0){
        $.ajax({
            method: "POST",
            url: "/login",
            data: { passport: $('#cellPhone').val(), password: $('#password').val() }
        })
        .done(function( msg ) {
            location.href = '/products' 
        })
        .fail(function(msg){
            $('#formAlert').show()
        })
    }
    return false
})