import './base.js'
import md5 from 'md5'
import {
  motionAlert
} from '../vendors/motion-alert'
import {
    PROJECT_APPLICATION_RULE_TEXT,
    PROJECT_APPLICATION_RULE_CHECKBOX,
    PROJECT_APPLICATION_RULE_RADIO
} from '../../../server-src/config/projectConf'

if (module.hot) {
  module.hot.accept()
}

Foundation.Abide.defaults.validators['check_limit'] = function (element, required, parent) {
  if (parent.find(':checked').length >= 1) {
    return true
  } else {
    return false
  }
}

const ApplicationModel = function (project, priceIndex) {
  this.priceIndex = ko.observable(priceIndex)
  this.rules = ko.observableArray(project.template.rules)
  if (project.template.rules) {
    this.haveRules = ko.observable(true)
    this.haveNoRules = ko.observable(false)
  } else {
    this.haveRules = ko.observable(false)
    this.haveNoRules = ko.observable(true)
  }

  this.title = ko.observable(project.prices[priceIndex].title)
  this.price = ko.observable(project.prices[priceIndex].price)

  let formButton = {
    submit: ko.observable(false)
  }

  // ko.applyBindings(formButton, document.getElementById('formButton'))
  this.submit = ko.observable(false)
  const Attachments = function () {
    this.attachments = []
    const self = this

    this.addAttachment = function (id) {
      self.attachments.push(id)
    }

    this.removeAttachment = function (idx) {
      self.attachments.splice(idx, 1)
    }
  }

  const attachments = new Attachments()

  if (document.getElementById('attachmentUploader')) {
    require.ensure([], function (require) {
      let dropzone = require('../vendors/dropzone.js')
      let key_tokens = []
      let attachmentUploaderRemovedIndex
      $('#attachmentUploader').on('mousedown', '.dz-remove', function () {
        attachmentUploaderRemovedIndex = $(this).parents('div').index() - 1
      })
      $('#attachmentUploader').dropzone({
        url: imgUploadUrl,
        maxFilesize: 50, // MB
        addRemoveLinks: true,
        maxFiles: 5,
        parallelUploads: 1,
        acceptedFiles: '.rar, .zip, .pdf, .word',
        autoProcessQueue: false,
        init: function () {
          this.on('addedfile', function (file) {
            var that = this
            const key = 'projects-' + projectId + '-' + md5(Math.random()).substr(0, 6) + '-' + file.name
            $.ajax({
              method: 'GET',
              dataType: 'json',
              url: '/attachments/token',
              data: { key }
            })
                    .done(function (respones) {
                      key_tokens.push({ key: respones.key, token: respones.token })
                      that.processQueue()
                    })
                    .fail(function (respones) {
                      window.alert('error to get upload config')
                    })
          })

          this.on('sending', function (file, xhr, formData) {
            formData.append('key', key_tokens[0].key)
            formData.append('token', key_tokens[0].token)
            key_tokens.shift()
          })

          this.on('success', function (file, response) {
            attachments.addAttachment(response.key)
            this.processQueue()
          })
          this.on('complete', (file) => {
                    // if($('#attachmentUploader .dz-complete.dz-success').length == 1){
                    //     $(file.previewElement).addClass('good-thumb')
                    // }
          })
          this.on('removedfile', function (file) {
            if ($(file.previewElement).hasClass('dz-complete')) {
              attachments.removeAttachment(attachmentUploaderRemovedIndex)
            }
          })
        }
      })
    })
  }

  $('#saveGood').on('click', () => {
    Foundation.reInit($('#formGood'))
    $('#formGood').foundation('validateForm')

    let applicationInfo
    const rules = project.template.rules
    // 投标规则数组
    if (rules) {
      const rulesInfo = []
      for (let i in rules) {
        if (rules[i].type === PROJECT_APPLICATION_RULE_TEXT) {
          rulesInfo.push({ value: $('[name=' + PROJECT_APPLICATION_RULE_TEXT + i + ']').val() })
        }
        if (rules[i].type === PROJECT_APPLICATION_RULE_CHECKBOX) {
          const checkArray = []
          $('[name=' + PROJECT_APPLICATION_RULE_CHECKBOX + i + ']:checked').each(function () {
            checkArray.push($(this).val())
          })
          rulesInfo.push({ value: checkArray })
        }
        if (rules[i].type === PROJECT_APPLICATION_RULE_RADIO) {
          rulesInfo.push({ value: $('[name=' + PROJECT_APPLICATION_RULE_RADIO + i + ']:checked').val() })
        }
      }
      applicationInfo = rulesInfo
    } else {
      applicationInfo = $('#information').val()
    }

    if ($('[data-invalid]').length === 0) {
      formButton.submit(true)
      $('#saveGood').text('正在提交申请')

      const _csrf = $('#_csrf').val()
      const projectId = $('#projectId').val()
      const priceIndex = $('#priceIndex').val()
      const realName = $('#realName').val()
      const contactPhone = $('#contactPhone').val()
      const identifyCardNumber = $('#identifyCardNumber').val()
      const companyName = $('#companyName').val()
      const companyAddress = $('#companyAddress').val()
      const information = [applicationInfo, attachments.attachments]// 申请信息和附件

      $.ajax({
        method: 'POST',
        url: '/applications',
        dataType: 'json',
        data: { _csrf, projectId, priceIndex, realName, contactPhone, identifyCardNumber, companyName, companyAddress, information }
      })
        .done(function (response) {
          const option = {
            status: 'success',
            title: '成功',
            note: '提交成功'
          }
          motionAlert(option)
          window.location.href = '/applications/' + response.id
        })
        .fail(function (response) {
          const option = {
            title: '错误',
            note: '提交失败！'
          }
          motionAlert(option)
          formButton.submit(false)
          $('#saveGood').attr('disabled', false)
          $('#saveGood').text('确认并提交申请')
          $('#formAlert').show()
        })
    } else {
        // $(window).scroll();
      $('html, body').animate({ scrollTop: $('.is-invalid-label, is-invalid-input').eq(0).offset().top })
    }

    return false
  })
}

let applicationModel = new ApplicationModel(project, priceIndex)
ko.applyBindings(applicationModel)
