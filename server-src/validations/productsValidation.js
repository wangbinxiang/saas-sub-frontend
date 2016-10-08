import validate from 'koa-joi-schema';
import Joi from 'joi';

export const indexValidation = validate('query')(Joi.object().keys({
	number: Joi.number().integer(),
	size: Joi.number().integer()
}));

export const showAddValidation = validate('query')(Joi.object().keys({
	productTypeId: Joi.number().integer().required()
}));

export const addValidation = validate('request.body')(Joi.object().keys({
	name: Joi.string().trim().required(),
	feature: Joi.string().trim().required(),
	productType: Joi.number().integer().required(),
	description: Joi.required(),
	slides: Joi.array().items(Joi.number()).single().required(),
}));

export const editParamsValidation = validate('params')(Joi.object().keys({
	'0': Joi.string(),
	id: Joi.number().integer().required()
}));

export const editRequestBodyValidation = validate('request.body')(Joi.object().keys({
	name: Joi.string().trim().required(),
	feature: Joi.string().trim().required(),
	productType: Joi.number().integer().required(),
	description: Joi.required(),
	slides: Joi.array().items(Joi.number()).single().required(),
}));

export const delValidation = validate('params')(Joi.object().keys({
	'0': Joi.string(),
	id: Joi.number().integer().required()
}));


//预览数据检查
export const previewValidation = validate('params')(Joi.object().keys({
	'0': Joi.string(),
	id: Joi.number().integer().required()
}));

export const pricesParamsValidation = validate('params')(Joi.object().keys({
	'0': Joi.string(),
	id: Joi.number().integer().required()
}));

export const pricesRequestBodyValidation = validate('request.body')(Joi.object().keys({
	prices: Joi.array().required()
}));
