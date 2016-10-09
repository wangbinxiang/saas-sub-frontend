export default async function inputValidationError(ctx, next) {
	try {
		await next();
	} catch (e) {
		if (!e.isJoi) throw e
		ctx.status = 400;
		ctx.body = {
	      error: 'Invalid input',
	      reason: e
	    }
	}
}