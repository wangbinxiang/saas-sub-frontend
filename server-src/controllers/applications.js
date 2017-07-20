import ApplicationService from '../models/application/ApplicationService'
import ProjectService from '../models/application/ProjectService'

import {
  PROJECT_STATUS_NORMAL,
  PROJECT_STATUS_PUBLISH,
  PROJECT_STATUS_DELETE,
  PROJECT_STATUS_NAMES,
  PROJECT_CATEGORY_INVEST,
  PROJECT_CATEGORY_FINACE,
  PROJECT_CATEGORY_NAMES,
  PROJECT_APPLICATION_RULE_TEXT,
  PROJECT_APPLICATION_RULE_CHECKBOX,
  PROJECT_APPLICATION_RULE_RADIO
} from '../config/projectConf'

import {
  APPLICATION_STATUS_NORMAL,
  APPLICATION_STATUS_PAID,
  APPLICATION_STATUS_DECLINE,
  APPLICATION_STATUS_APPROVE,
  APPLICATION_STATUS_NAMES,

  APPLICATION_ROLL_HOST,
  APPLICATION_ROLL_APPLICANT,
  APPLICATION_ROLL_GUEST,
  APPLICATION_ROLL_NAMES,
  REPLY_SOURCE_APPLICATION,
  REPLY_SOURCE_PROJECT
} from '../config/applicationConf'

import nl2br from 'nl2br'
import config from 'config'

export async function index (ctx, next) {
  let number = ctx.query.number ? ctx.query.number : 1

  let size = ctx.query.size ? ctx.query.size : 20

  const flag = !!ctx.query.flag

  let filters = {
    memberId: ctx.state.user.id,
    projectUserId: ctx._subId
  }

  let pages = {
    number,
    size
  }

  let applications = null
  let isNext = false

  const applicationService = new ApplicationService()
  let result = await applicationService.index(filters, pages)

  if (result !== null) {
    let page = result.page
    applications = result.applications

    if (page && page.haveNext()) {
      isNext = true
    }
  }

  if (ctx.accepts('html', 'text', 'json') === 'json') {
    ctx.body = {
      applications,
      isNext
    }
  } else {
    const title = '项目申请管理'
    const pageJs = webpackIsomorphicTools.assets().javascript.applications

    ctx.body = {
      applications
    }

    let pageNo = number
    await ctx.render('application/index', {
      title,
      pageJs,
      applications,
      isNext,
      pageNo,
      flag
    })
  }
}

export async function showAdd (ctx, next) {
  const projectId = ctx.query.projectId
  const priceIndex = ctx.query.priceIndex

  const projectService = new ProjectService()
  const project = await projectService.get(projectId)

  if (project === null || project.prices[priceIndex] === undefined || project.userId != ctx._subId) {
    ctx.status = 404
    await ctx.render('404')
  } else {
    const title = '项目申请'

    const pageJs = webpackIsomorphicTools.assets().javascript.applicationAdd

    const csrf = ctx.csrf

    const imgHost = config.get('qiniu.bucket.subImg.url')
    const imgUploadUrl = config.get('qiniu.bucket.subImg.uploadUrl')

    await ctx.render('application/add', {
      title,
      pageJs,
      csrf,
      project,
      priceIndex,
      imgHost,
      imgUploadUrl,
      PROJECT_APPLICATION_RULE_TEXT,
      PROJECT_APPLICATION_RULE_CHECKBOX,
      PROJECT_APPLICATION_RULE_RADIO
    })
  }
}

export async function add (ctx, next) {
  const projectId = ctx.request.body.projectId
  const priceIndex = ctx.request.body.priceIndex // string

  const projectService = new ProjectService()
  const project = await projectService.get(projectId)

  if (project === null || project.prices[priceIndex] === undefined || project.userId != ctx._subId) {
    await next()
  } else {
    const userId = ctx.state.user.id
    const realName = ctx.request.body.realName // string
    const contactPhone = ctx.request.body.contactPhone // string
    const identifyCardNumber = ctx.request.body.identifyCardNumber ? ctx.request.body.identifyCardNumber : '' // string
    const companyName = ctx.request.body.companyName // string
    const companyAddress = ctx.request.body.companyAddress // string
    const information = ctx.request.body.information // string

    const applicationService = new ApplicationService()
    const application = await applicationService.add(userId, projectId, realName, contactPhone, identifyCardNumber, companyName, companyAddress, information, priceIndex)

    if (application === null) {
      throw new Error('add fail')
    } else {
      ctx.body = application
    }
  }
}

export async function finish (ctx, next) {
  // 项目id
  let id = ctx.params.id

  const applicationService = new ApplicationService()
  const application = await applicationService.finish(id)

  if (application === null) {
    throw new Error('finish fail')
  } else {
    ctx.body = application
  }
}

export async function approve (ctx, next) {
  // 项目id
  let id = ctx.params.id

  const applicationService = new ApplicationService()
  const application = await applicationService.approve(id)

  if (application === null) {
    throw new Error('approve fail')
  } else {
    ctx.body = application
  }
}

export async function decline (ctx, next) {
  // 项目id
  let id = ctx.params.id

  const applicationService = new ApplicationService()
  const application = await applicationService.decline(id)

  if (application === null) {
    throw new Error('decline fail')
  } else {
    ctx.body = application
  }
}

export async function reply (ctx, next) {
  const id = ctx.params.id
  const userId = ctx.state.user.id
  const content = [ctx.request.body.content] // string

  const files = ctx.request.body.files
  if (files) {
    content.push(files)
  }

  const applicationService = new ApplicationService()
  const reply = await applicationService.reply(id, userId, content)

  if (reply === null) {
    throw new Error('reply fail')
  } else {
    ctx.body = reply
  }
}

export async function getReplies (ctx, next) {
  const id = ctx.params.id

  let number = ctx.query.number ? ctx.query.number : 1

  let size = ctx.query.size ? ctx.query.size : 25

  let filters = {}

  let pages = {
    number,
    size
  }

  let replies = null

  let isNext = false

  const applicationService = new ApplicationService()
  const result = await applicationService.getReplies(id, filters, pages)

  if (result !== null) {
    let page = result.page
    replies = result.replies

    if (page && page.haveNext()) {
      isNext = true
    }
  }

  ctx.body = {
    isNext,
    replies
  }
}

export async function detail (ctx, next) {
  const id = ctx.params.id
  const applicationService = new ApplicationService()
  const result = await applicationService.detail(id)

  if (result === null) {
    await next()
  } else {
    const {
      application,
      project,
      applicationContract
    } = result
    let role
    // 申请方打开
    if (application.userId == ctx.state.user.id) {
      role = APPLICATION_ROLL_APPLICANT
    } else {
      role = APPLICATION_ROLL_GUEST
    }

    if (role === APPLICATION_ROLL_GUEST) {
      await next()
    } else {
      const hostId = project.userId
      const applicantId = application.userId

      let noticeTitle = ''

      // 构建提示文字
      if (role === APPLICATION_ROLL_HOST) {
        // 项目方
        // 磋商中：请及时处理申请
        // 在线磋商已结束！请及时给出处理结果。
        //
        // 通过：已批准该申请。
        // 拒绝：已拒绝该申请。
        switch (application.status) {
          case APPLICATION_STATUS_NORMAL:
            noticeTitle = '请及时处理申请'
            break
          case APPLICATION_STATUS_PAID:
            noticeTitle = ''
            break
          case APPLICATION_STATUS_DECLINE:
            noticeTitle = '已取消该申请。'
            break
          case APPLICATION_STATUS_APPROVE:
            noticeTitle = '已同意该申请。'
            break
        }
      } else if (role === APPLICATION_ROLL_APPLICANT) {
        // 申请方
        //
        // 磋商中：申请提交成功！感谢您的申请。
        // 在线磋商已结束！请耐心等待结果。
        //
        // 通过：恭喜您！您的申请已被批准。
        // 拒绝：很抱歉！您的申请未获批准。
        switch (application.status) {
          case APPLICATION_STATUS_NORMAL:
            noticeTitle = '申请提交成功！感谢您的申请。'
            break
          case APPLICATION_STATUS_PAID:
            noticeTitle = ''
            break
          case APPLICATION_STATUS_DECLINE:
            noticeTitle = '申请已取消。'
            break
          case APPLICATION_STATUS_APPROVE:
            noticeTitle = '恭喜您！您的申请已成功。'
            break
        }
      }

      const title = '项目申请'

      const pageJs = webpackIsomorphicTools.assets().javascript.applicationDetail

      // const imgHost = config.get('qiniu.bucket.subImg.url');

      const csrf = ctx.csrf

      const imgHost = config.get('qiniu.bucket.subImg.url')
      const imgUploadUrl = config.get('qiniu.bucket.subImg.uploadUrl')

      await ctx.render('application/detail', {
        title,
        hostId,
        applicantId,
        application,
        project,
        applicationContract,
        pageJs,
        nl2br,
        csrf,
        role,
        noticeTitle,
        imgHost,
        imgUploadUrl,
        APPLICATION_STATUS_NORMAL,
        APPLICATION_STATUS_PAID,
        APPLICATION_STATUS_DECLINE,
        APPLICATION_STATUS_APPROVE,
        APPLICATION_ROLL_HOST,
        APPLICATION_ROLL_APPLICANT,
        REPLY_SOURCE_APPLICATION,
        REPLY_SOURCE_PROJECT,
        PROJECT_APPLICATION_RULE_TEXT,
        PROJECT_APPLICATION_RULE_CHECKBOX,
        PROJECT_APPLICATION_RULE_RADIO
        // imgHost
      })
    }
  }
}
