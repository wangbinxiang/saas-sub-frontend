import ProjectService from '../models/application/ProjectService';
import {
	PROJECT_STATUS_NORMAL,
	PROJECT_STATUS_PUBLISH,
	PROJECT_STATUS_DELETE,
    PROJECT_STATUS_NAMES,
    PROJECT_CATEGORY_B2B,
    PROJECT_CATEGORY_B2C,
    PROJECT_CATEGORY_NAMES
} from '../config/projectConf';
import nl2br from 'nl2br';
import config from 'config';


export async function index(ctx, next) {

	let number = ctx.query.number ? ctx.query.number : 1;

	let size = ctx.query.size ? ctx.query.size : 25;

	let filters = {
		category: PROJECT_CATEGORY_B2C,
	    userId: ctx._subId,
	    status: PROJECT_STATUS_PUBLISH
	};

	let pages = {
	    number,
	    size
	};

	let projects = null;

    let isNext = false;


	const projectService = new ProjectService();
	const result = await projectService.index(filters, pages);


	if (result !== null) {
	    let page = result.page;
	    projects = result.projects;

	    if (page && page.haveNext()) {
	        isNext = true;
	    }
	}

	if (ctx.accepts('html', 'text', 'json') === 'json') {
	    ctx.body = {
	        projects,
	        isNext
	    };
	} else {
		const title = '项目列表';

		const pageJs = webpackIsomorphicTools.assets().javascript.projects;

		const imgHost = config.get('qiniu.bucket.subImg.url');
		const imgStyle = config.get('qiniu.bucket.subImg.style.productList');

		const csrf = ctx.csrf;

		await ctx.render('projects/index', {
		    csrf,
		    title,
		    projects,
		    isNext,
		    number,
		    PROJECT_STATUS_NAMES,
		    PROJECT_CATEGORY_NAMES,
		    pageJs,
		    imgHost,
		    imgStyle
		});
	}
}


export async function search(ctx, next) {

	let number = ctx.query.number ? ctx.query.number : 1;

	let size = ctx.query.size ? ctx.query.size : 25;

	let filters = {
		category: PROJECT_CATEGORY_B2C,
	    status: PROJECT_STATUS_PUBLISH
	};

	let pages = {
	    number,
	    size
	};

	let projects = null;

    let isNext = false;


	const projectService = new ProjectService();
	const result = await projectService.index(filters, pages);

	if (result !== null) {
	    let page = result.page;
	    projects = result.projects;

	    if (page && page.haveNext()) {
	        isNext = true;
	    }
	}


	if (ctx.accepts('html', 'text', 'json') === 'json') {
	    ctx.body = {
	        projects,
	        isNext
	    };
	} else {
		const title = '已发布项目库';

		const pageJs = webpackIsomorphicTools.assets().javascript.projectSearch;

		const imgHost = config.get('qiniu.bucket.subImg.url');
		const imgStyle = config.get('qiniu.bucket.subImg.style.productList');

		const csrf = ctx.csrf;

		await ctx.render('projects/search', {
		    csrf,
		    title,
		    projects,
		    isNext,
		    number,
		    PROJECT_STATUS_NAMES,
		    PROJECT_CATEGORY_NAMES,
		    pageJs,
		    imgHost,
		    imgStyle
		});
	}
}



// export async function showAdd(ctx, next) {

// 	const title = "发布项目"

// 	const pageJs = webpackIsomorphicTools.assets().javascript.projectEdit;

// 	const data = null;

// 	const imgHost = config.get('qiniu.bucket.subImg.url');
//     const imgUploadUrl = config.get('qiniu.bucket.subImg.uploadUrl');
//     const csrf = ctx.csrf;

// 	await ctx.render('projects/add', {
// 		title,
// 		pageJs,
// 	    data,
// 	    imgHost,
// 	    imgUploadUrl,
// 	    csrf,
// 	    PROJECT_CATEGORY_B2B,
// 	    PROJECT_CATEGORY_B2C,
// 	    PROJECT_CATEGORY_NAMES,
// 	});
// }

// export async function add(ctx, next) {
// 	//当前店铺id
//     const userId = ctx._subId;

//     const name = ctx.request.body.name; //string
//     const feature = ctx.request.body.feature; //string
//     const category = ctx.request.body.category; //string
//     const projectType = ctx.request.body.projectType; //int
//     const description = ctx.request.body.description? ctx.request.body.description: []; //string
//     const slides = ctx.request.body.slides? ctx.request.body.slides: []; //string

//     const projectService = new ProjectService();
//     const project = await projectService.add(userId, name, feature, category, projectType, description, slides);
//     if (project === null) {
//     	throw new Error('add fail');
//     } else {
//     	ctx.body = project;
//     }
// }

// export async function showEdit(ctx, next) {

// 	const id = ctx.params.id;

// 	const projectService = new ProjectService();
// 	const project = await projectService.get(id, ctx._subId);
// 	console.log(project)
// 	if (project === null) {
// 		await next()
// 	} else {
// 		const title = '编辑项目';

// 		const pageJs = webpackIsomorphicTools.assets().javascript.projectEdit;

// 		const imgHost = config.get('qiniu.bucket.subImg.url');

//         const imgUploadUrl = config.get('qiniu.bucket.subImg.uploadUrl');

//         const csrf = ctx.csrf;

//         await ctx.render('projects/add', {
// 			title,
// 			pageJs,
// 		    data: project,
// 		    imgHost,
// 		    imgUploadUrl,
// 		    csrf,
// 		    PROJECT_CATEGORY_B2B,
// 		    PROJECT_CATEGORY_B2C,
// 		    PROJECT_CATEGORY_NAMES,
// 		});
// 	}
// }

// export async function edit(ctx, next) {
// 	const userId = ctx._subId;
// 	const id = ctx.params.id; //integer

// 	const name = ctx.request.body.name; //string
// 	const projectType = ctx.request.body.projectType; //int
// 	const feature = ctx.request.body.feature; //string
// 	const description = ctx.request.body.description; //string
// 	const slides = ctx.request.body.slides; //string

// 	const projectService = new ProjectService();
// 	const project = await projectService.edit(userId, id, name, feature, projectType,  description, slides);

// 	if (project === null) {
//         throw new Error('edit fail');
//     } else {
//         ctx.body = project;
//     }
// }

// export async function del(ctx, next) {

// }

// export async function showPrices(ctx, next) {

// 	let id = ctx.params.id;
// 	const projectService = new ProjectService();
// 	const project = await projectService.get(id, ctx._subId);

// 	if (project === null) {
// 	    await next()
// 	} else {
// 		//产品id
// 		const title = '产品价格管理';

// 		const pageJs = webpackIsomorphicTools.assets().javascript.projectPrices;
// 		console.log(project);
// 	    const name = project.name
// 	    const prices = project.prices
// 	    const csrf = ctx.csrf;
// 	    // ctx.body = project;
// 	    await ctx.render('projects/prices', {
// 	        title,
// 	        id,
// 	        name,
// 	        prices,
// 	        pageJs,
// 	        csrf
// 	    });
// 	}
// }

// export async function prices(ctx, next) {
// 	//产品id
// 	const id = ctx.params.id;
// 	const prices = ctx.request.body.prices; //string

//     const projectService = new ProjectService();
//     const project = await projectService.addPrices(id, prices);
// 	if (project === null) {
//         throw new Error('prices fail');
//     } else {
//         ctx.body = project;
//     }
// }

// export async function publish(ctx, next) {
// 	//项目id
// 	let id = ctx.params.id;

// 	const projectService = new ProjectService();
// 	const project = await projectService.publish(id);

// 	if (project === null) {
//         throw new Error('publish fail');
//     } else {
//         ctx.body = project;
//     }
// }

// export async function revert(ctx, next) {
// 	//项目id
// 	let id = ctx.params.id;

// 	const projectService = new ProjectService();
// 	const project = await projectService.revert(id);

// 	if (project === null) {
//         throw new Error('revert fail');
//     } else {
//         ctx.body = project;
//     }
// }


export async function detail(ctx, next) {
	const id = ctx.params.id;
	const projectService = new ProjectService();
	const project = await projectService.detail(id, ctx._subId, PROJECT_CATEGORY_B2C);
	if (project === null) {
	    await next();
	} else {
	    if (ctx.accepts('html', 'text', 'json') === 'json') {
	        ctx.body = project;
	    } else {
	    	let template = 'detail';
	    	if(project.slides.length === 0) {
	    		template = 'detailEmptySlides'
	    	}
	        const title = '项目预览';

	        const pageJs = webpackIsomorphicTools.assets().javascript.projectDetail;

	        const imgHost = config.get('qiniu.bucket.subImg.url');

	        await ctx.render('projects/' + template, {
	            title,
	            project,
	            pageJs,
	            nl2br,
	            imgHost
	        });
	    }
	}
}

