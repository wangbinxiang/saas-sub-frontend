import { ERROR_MESSAGE_LIST } from '../config/errorMessageConf'

const getErrorMessage = function (code, errorMessageList) {
  if (errorMessageList[code]) {
    return errorMessageList[code]
  } else {
    throw new Error('error code not exist')
  }
}

export function showError (ctx, code) {
  const errorMessage = getErrorMessage(code, ERROR_MESSAGE_LIST)
  ctx.status = errorMessage.statusCode
  ctx.body = {
    message: errorMessage.message
  }
}
