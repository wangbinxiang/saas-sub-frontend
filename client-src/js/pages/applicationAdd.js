if (module.hot) {
    module.hot.accept()
}

import './base.js'


let formButton = {
    submit: ko.observable(false)
}

ko.applyBindings(formButton, document.getElementById('formButton'));

$('#saveGood').on('click', () => {
    Foundation.reInit($('#formGood'));
    $('#formGood').foundation('validateForm');

    if($('[data-invalid]').length === 0){
        formButton.submit(true);
        $('#saveGood').text('正在提交申请')
     
		const _csrf              = $('#_csrf').val()
		const projectId          = $('#projectId').val()
		const priceIndex         = $('#priceIndex').val()
		const realName           = $('#realName').val()
		const contactPhone       = $('#contactPhone').val()
		const identifyCardNumber = $('#identifyCardNumber').val()
		const companyName        = $('#companyName').val()
		const companyAddress     = $('#companyAddress').val()
		const information        = [$('#information').val()]

        $.ajax({
            method: 'POST',
            url: '/applications',
            dataType: "json",
            data: { _csrf, projectId, priceIndex, realName, contactPhone, identifyCardNumber, companyName, companyAddress, information }
        })
        .done(function(response) {
            alert('提交成功');
            location.href = '/applications/' + response.id;
        })
        .fail(function(response){
            alert('提交失败！');
            formButton.submit(false);
            $('#saveGood').attr('disabled', false)
            $('#saveGood').text('确认并提交申请')
            $('#formAlert').show()
        })
    } else {
        $(window).scroll();
    }

    return false
})