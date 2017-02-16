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

		const title = '项目列表 - ' + ctx._shop.title;

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

	        const title = project.name + ' - ' + ctx._shop.title;

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

