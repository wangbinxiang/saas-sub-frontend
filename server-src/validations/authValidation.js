import validate from 'koa-joi-schema';
import Joi from 'joi';


export const wechatRelationshipValidation = validate('query')(Joi.object().keys({
	parentId: Joi.number().integer().required(),
}));


export const wechatRelationshipCallbackValidation = validate('query')(Joi.object().keys({
	parentId: Joi.number().integer().required(),
	code: Joi.string().trim().required()
}));