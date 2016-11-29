import validate from 'koa-joi-schema';
import Joi from 'joi';


export const wechatRelationshipValidation = validate('query')(Joi.object().keys({
	parentId: Joi.number().integer()
}));


export const wechatRelationshipCallbackValidation = validate('query')(Joi.object().keys({
	parentId: Joi.number().integer().required(),
	code: Joi.string().trim().required()
}));

export const isCellphoneSignupValidation = validate('query')(Joi.object().keys({
	cellPhone: Joi.number().integer().required()
}));

export const sendSignupCellphoneVerificationCodeValidation = validate('query')(Joi.object().keys({
	cellPhone: Joi.number().integer().required()
}));

export const bindCellphoneRequestBodyValidation = validate('request.body')(Joi.object().keys({
	cellPhone: Joi.number().integer().required(),
	code: Joi.number().integer().required()
}));