import validate from 'koa-joi-schema'
import Joi from 'joi'

export const indexValidation = validate('query')(Joi.object().keys({
  number: Joi.number().integer(),
  size: Joi.number().integer()
}))

export const addValidation = validate('request.body')(Joi.object().keys({
  consignee: Joi.string().trim().required(),
  phone: Joi.number().integer(),
  province: Joi.number().integer(),
  city: Joi.number().integer(),
  district: Joi.number().integer(),
  address: Joi.string().trim().required(),
  postalCode: Joi.number().integer(),
  _csrf: Joi.string().trim().required()
}))

export const editRequestBodyValidation = validate('request.body')(Joi.object().keys({
  consignee: Joi.string().trim().required(),
  phone: Joi.number().integer(),
  province: Joi.number().integer(),
  city: Joi.number().integer(),
  district: Joi.number().integer(),
  address: Joi.string().trim().required(),
  postalCode: Joi.number().integer(),
  _csrf: Joi.string().trim().required()
}))

export const editParamsValidation = validate('params')(Joi.object().keys({
  '0': Joi.string(),
  id: Joi.number().integer().required()
}))

export const delParamsValidation = validate('params')(Joi.object().keys({
  '0': Joi.string(),
  id: Joi.number().integer().required()
}))
