import './base.js'
import {
  motionAlert
} from '../vendors/motion-alert'
if (module.hot) {
  module.hot.accept()
}

const DeliveryInfomationModel = function (deliveryInformations, isNext, pageNumber) {
  let self = this
  self.deliveryInformations = ko.observableArray(deliveryInformations)
  self.isNext = ko.observable(isNext)

  self.add = function () {
    const consignee = $('#newConsignee').val()
    const phone = $('#newPhone').val()
    const province = $('#newProvince').val()
    const city = $('#newCity').val()
    const district = $('#newDistrict').val()
    const address = $('#newAddress').val()
    const postalCode = $('#newPostalCode').val()
    const _csrf = $('#_csrf').val()
    if (address !== '') {
      $.ajax({
        method: 'POST',
        url: '/delivery-information',
        dataType: 'json',
        data: { consignee, phone, province, city, district, address, postalCode, _csrf }
      })
            .done(function (response) {
              self.deliveryInformations.unshift({
                id: response.id,
                consignee: response.consignee,
                phone: response.phone,
                province: response.province,
                city: response.city,
                district: response.district,
                address: response.address,
                postalCode: response.postalCode
              })
              const option = {
                status: 'success',
                title: '成功',
                note: '地址添加成功'
              }
              motionAlert(option)
            })
            .fail(function (response) {
              const option = {
                title: '错误',
                note: response.responseJSON.message
              }
              motionAlert(option)
            })
    }
    $('#newAddress').val('')
  }

  self.remove = function (deliveryInfomation) {
    $.ajax({
      method: 'DELETE',
      url: '/delivery-informations/' + deliveryInfomation.id,
      dataType: 'json',
      data: { _csrf: $('#_csrf').val() }
    })
        .done(function (response) {
          self.deliveryInfomations.remove(deliveryInfomation)
        })
        .fail(function (response) {

        })
  }
  self.edit = (deliveryInfomation) => {
    $('#editRole').foundation('open')
    $('#editId').val(deliveryInfomation.id)
    $('#editConsignee').val(deliveryInfomation.consignee)
    $('#editPhone').val(deliveryInfomation.phone)
    $('#editProvince').val(deliveryInfomation.province)
    $('#editCity').val(deliveryInfomation.city)
    $('#editDistrict').val(deliveryInfomation.district)
    $('#editAddress').val(deliveryInfomation.address)
    $('#editPostalCode').val(deliveryInfomation.postalCode)
  }

  self.save = function () {
    let saveId = $('#editId').val()
    let saveConsignee = $('#editConsignee').val()
    let savePhone = $('#editPhone').val()
    let saveProvince = $('#editProvince').val()
    let saveCity = $('#editCity').val()
    let saveDistrict = $('#editDistrict').val()
    let saveAddress = $('#editAddress').val()
    let savePostalCode = $('#editPostalCode').val()
    $.ajax({
      method: 'PUT',
      url: '/delivery-informations/' + saveId,
      dataType: 'json',
      data: {
        consignee: saveConsignee,
        phone: savePhone,
        province: saveProvince,
        city: saveCity,
        district: saveDistrict,
        address: saveAddress,
        postalCode: savePostalCode,
        _csrf: $('#_csrf').val() }
    })
        .done(function (response) {
          $('#editRole').foundation('close')
          let deliveryInformationEdit = ko.utils.arrayFirst(self.deliveryInformations(), function (item) {
            return parseInt(response.id) === parseInt(item.id)
          })
          let text = {
            id: response.id,
            consignee: response.consignee,
            phone: response.phone,
            province: response.province,
            city: response.city,
            district: response.district,
            address: response.address,
            postalCode: response.postalCode
          }
          self.deliveryInformations.splice(self.categories.indexOf(deliveryInformationEdit), 1, text)
        })
        .fail(function (response) {

        })
  }

  self.more = function () {
    pageNumber += 1
    $.ajax({
      method: 'GET',
      url: '/delivery-informations?number=' + pageNumber,
      dataType: 'json'
    })
        .done(function (response) {
          const deliveryInformations = response.deliveryInformations
          for (let deliveryInformation of deliveryInformations) {
            self.deliveryInformations.push(deliveryInformation)
          }
          self.isNext(response.isNext)
        })
  }

  // 添加地址模态框省市区三级联动
  require.ensure([], function (require) {
    let area = require('../vendors/area/area-1')
    for (let province in area) {
      $('#newProvince').append('<option value="' + province + '">' + area[province].name + '</option>')
    }
  })

  $('#newProvince').on('change', () => {
    $('#newCity option:gt(0)').remove()
    let city = require('../vendors/area/area-' + $('#newProvince').val())
    for (let c in city) {
      $('#newCity').append('<option value="' + c + '">' + city[c].name + '</option>')
    }
  })

  $('#newCity').on('change', () => {
    $('#newDistrict option:gt(0)').remove()
    let district = require('../vendors/area/area-' + $('#newCity').val())
    for (let d in district) {
      $('#newDistrict').append('<option value="' + d + '">' + district[d].name + '</option>')
    }
  })

    // 编辑地址模态框省市区三级联动
  require.ensure([], function (require) {
    let area = require('../vendors/area/area-1')
    for (let province in area) {
      $('#editProvince').append('<option value="' + province + '">' + area[province].name + '</option>')
    }
  })

  $('#editProvince').on('change', () => {
    $('#editCity option:gt(0)').remove()
    let city = require('../vendors/area/area-' + $('#editProvince').val())
    for (let c in city) {
      $('#editCity').append('<option value="' + c + '">' + city[c].name + '</option>')
    }
  })

  $('#editCity').on('change', () => {
    $('#editDistrict option:gt(0)').remove()
    let district = require('../vendors/area/area-' + $('#editCity').val())
    for (let d in district) {
      $('#editDistrict').append('<option value="' + d + '">' + district[d].name + '</option>')
    }
  })
}

let deliveryInfomationModel = new DeliveryInfomationModel(deliveryInformations, isNext, pageNumber)
ko.applyBindings(deliveryInfomationModel)
