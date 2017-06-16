import './base.js'
import '../vendors/fcarousel.js'

$('#priceLabels a').on('click', function () {
  if (!$(this).hasClass('checked')) {
    $(this).addClass('checked').siblings('.checked').removeClass('checked')
    if ($(this).attr('data-rebate') > 0) {
      $('#priceRelationship').text($(this).attr('data-price'))
      $('#rebateRelationship').text($(this).attr('data-rebate'))
      $('#priceRelationshipDiv').show()
      $('#rebateRelationshipDiv').show()
      $('#priceStatDiv').hide()
    } else {
      $('#priceStat').text($(this).attr('data-price'))
      $('#priceRelationshipDiv').hide()
      $('#rebateRelationshipDiv').hide()
      $('#priceStatDiv').show()
    }
  }
})

$('#orderNow').on('click', function () {
  let ref = 'id=' + id + '&price=' + $('#priceLabels a.checked').index() + '&number=' + $('#orderNumber').val() + (isPruchase ? '&source=1' : '')
  window.location.href = '/orders/add?' + ref
})
