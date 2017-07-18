import RequestAdapter from '../../libs/RequestAdapter'
import ApplicationTranslator from '../translator/ApplicationTranslator'
import ReplyTranslator from '../translator/ReplyTranslator'
import ApplicationRequestJsonApi from '../request/ApplicationRequestJsonApi'
import {
	APPLICATION_GET,
	APPLICATION_ADD,
	APPLICATION_FINISH,
	APPLICATION_APPROVE,
	APPLICATION_DECLINE,
	APPLICATION_REPLY,
	APPLICATION_REPLY_GET
} from '../../config/apiFeatureConf'
import pageCLass from '../model/page'
/**
 * 产品适配器
 */
export default class ApplicationAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new ApplicationTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new ApplicationRequestJsonApi(apiFeature, data)
  }

  get ({
		idList,
		filters,
		pages,
		sort
	}, aApplicationClass) {
    this.buildRequest(APPLICATION_GET, {
      idList,
      filters,
      pages,
      sort
    })

		// 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aApplicationClass

    return this.request()
  }

  add ({
    userId,
    projectId,
    realName,
    contactPhone,
    identifyCardNumber,
    companyName,
    companyAddress,
    information,
    priceIndex
  }, aApplicationClass) {
    this.buildRequest(APPLICATION_ADD, {
      userId,
      projectId,
      realName,
      contactPhone,
      identifyCardNumber,
      companyName,
      companyAddress,
      information,
      priceIndex
    })

    this.activeClass = aApplicationClass

    return this.request()
  }

  finish ({
		id
	}, aApplicationClass) {
    this.buildRequest(APPLICATION_FINISH, {
      id
    })

    this.activeClass = aApplicationClass

    return this.request()
  }

  approve ({
		id
	}, aApplicationClass) {
    this.buildRequest(APPLICATION_APPROVE, {
      id
    })

    this.activeClass = aApplicationClass

    return this.request()
  }

  decline ({
		id
	}, aApplicationClass) {
    this.buildRequest(APPLICATION_DECLINE, {
      id
    })

    this.activeClass = aApplicationClass

    return this.request()
  }

  reply ({
		id,
		userId,
		source,
		content
	}, aReplyClass) {
    this.translator = new ReplyTranslator()

    this.buildRequest(APPLICATION_REPLY, {
      id,
      userId,
      source,
      content
    })

    this.activeClass = aReplyClass

    return this.request()
  }

  getReplies ({
		id,
		idList,
		filters,
		pages,
		sort
	}, aReplyClass) {
    this.translator = new ReplyTranslator()

    this.buildRequest(APPLICATION_REPLY_GET, {
      id,
      idList,
      filters,
      pages,
      sort
    })

		// 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aReplyClass

    return this.request()
  }
}
