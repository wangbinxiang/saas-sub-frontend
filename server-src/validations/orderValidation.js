import validate from 'koa-joi-schema'
import Joi from 'joi'


export const showAddOrderValidation = validate('query')(Joi.object().keys({
  id: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
  number: Joi.number().integer().required(),
  source: Joi.number().integer()
}))