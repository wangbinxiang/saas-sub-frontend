import validate from 'koa-joi-schema';
import Joi from 'joi';

export const indexValidation = validate('query')(Joi.object().keys({
	number: Joi.number().integer(),
	size: Joi.number().integer()
}));

export const addValidation = validate('request.body')(Joi.object().keys({
	name: Joi.string().trim().required(),
	category: Joi.number().integer().required()
}));

export const editParamsValidation = validate('params')(Joi.object().keys({
	'0': Joi.string(),
	id: Joi.number().integer().required()
}));

export const editRequestBodyValidation = validate('request.body')(Joi.object().keys({
	name: Joi.string().trim().required(),
	category: Joi.number().integer().required()
}));

export const delValidation = validate('params')(Joi.object().keys({
	'0': Joi.string(),
	id: Joi.number().integer().required()
}));