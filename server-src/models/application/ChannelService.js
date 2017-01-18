import ProductAdapter from '../adapter/ProductAdapter';
import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import Product from '../model/Product';
import ProductType from '../model/ProductType';
import CategoryAdapter from '../adapter/CategoryAdapter';
import Category from '../model/Category';
import ArticleAdapter from '../adapter/ArticleAdapter';
import Article from '../model/Article';
import ProjectAdapter from '../adapter/ProjectAdapter';
import Project from '../model/Project';
import config from 'config';
import lodash from 'lodash';

import {
    ARTICLE_STATUS_PUBLISH
} from '../../config/articleConf';

import {
    PRODUCT_STATUS_ON_SALE
} from '../../config/productConf';

import {
    PROJECT_STATUS_PUBLISH,
    PROJECT_CATEGORY_B2C
} from '../../config/projectConf';

/**
 * 频道页服务类
 */
export default class ChannelService {

	/**
	 * 频道页，按分类显示。
	 * @author wangbinxiang
	 * @date   2016-11-17T00:02:16+0800
	 * @param  {[type]}                 number        [description]
	 * @param  {[type]}                 size          [description]
	 * @param  {[type]}                 productTypeId [description]
	 * @param  {[type]}                 userId        [description]
	 * @return {[type]}                               [description]
	 */
	async productType(number, size, productTypeId, userId) {
		let page, products, productType;
		//获取分类
		
		const productTypeAdapter = new ProductTypeAdapter();
		const productTypeResult = await productTypeAdapter.get({ idList: productTypeId }, ProductType);	

		//获取分类下的商品数据
		
		if (productTypeResult && productTypeResult.userId === parseInt(userId)) {
			//属于该用户的productType才运行下面的程序
			productType = productTypeResult;


			const pages = {
		        number,
		        size
		    };

			const filters = {
				productType: productTypeId,
				status: PRODUCT_STATUS_ON_SALE
			}


			const productAdapter = new ProductAdapter();
			const productsResult = await productAdapter.get({
				filters,
				pages
			}, Product);

			if (productsResult !== null) {
				//没有获取数据 直接返回空
				page = productsResult.page;
				products = productsResult.result;
			} 
		}

		//返回 分页 和 products 数据
		return {
			page,
			products,
			productType
		};
	}


	/**
	 * 获取某分类下文章
	 * @author wangbinxiang
	 * @date   2016-12-02T15:50:47+0800
	 * @param  {[type]}                 number     [description]
	 * @param  {[type]}                 size       [description]
	 * @param  {[type]}                 categoryId [description]
	 * @param  {[type]}                 userId     [description]
	 * @return {[type]}                            [description]
	 */
	async category(number, size, categoryId, userId) {
		let page, articles, category;

		const categoryAdapter = new CategoryAdapter();
		category = await categoryAdapter.get({ idList: categoryId }, Category);
		if (category && category.userId === parseInt(userId)) {

			const pages = {
		        number,
		        size
		    };

			const filters = {
				categoryId,
				status: ARTICLE_STATUS_PUBLISH
			};
			const articleAdapter = new ArticleAdapter();
			const articleResult = await articleAdapter.get({
			    filters,
			    pages
			}, Article);
			if (articleResult !== null) {
				//没有获取数据 直接返回空
				page = articleResult.page;
				articles = articleResult.result;
			} 
		}

		//返回 分页 和 products 数据
		return {
			page,
			articles,
			category
		};
	}



	async gardenArticles(userId) {
		const layout = config.get('layout');

		const shopLayout = layout[userId]

		let slideArticles, categories, articles;
		//获取分类

		//获取文章需要幻灯片文章
		//幻灯片5个
		const pages = {
	        number: 1,
		    size: 5
	    };

		const filters = {
			userId,
			status: ARTICLE_STATUS_PUBLISH
		};

		const sort = '-id';

		const articleAdapter = new ArticleAdapter();
		const slideArticleResult = await articleAdapter.get({
		    filters,
		    pages,
		    sort
		}, Article);
		if (slideArticleResult !== null) {
			//没有获取数据 直接返回空
			slideArticles = slideArticleResult.result;
		}

		const slideIds = lodash.values(lodash.mapValues(slideArticles, 'id'))
		//
		//3个分类的文章
		//

		if (shopLayout['article']) {

			const categoryPages = {
				number: 1,
		        size: 8
			}

			const categoryFilters = {
			    userId: userId,
			    status: 0
			}

			const categoryAdapter = new CategoryAdapter();
			const categoriesResult = await categoryAdapter.get({ filters: categoryFilters, pages: categoryPages }, Category);

			if (categoriesResult !== null) {
				//没有获取数据 直接返回空
				categories = categoriesResult.result;
			}


			articles = {}
			for(let val of shopLayout['article']) {
				const pages = {
					number: 1,
			        size: 16
				}

				const filters = {
				    categoryId: val,
				    status: ARTICLE_STATUS_PUBLISH
				};

				const articleResult = await articleAdapter.get({
				    filters,
				    pages,
				    sort
				}, Article);

				if (articleResult !== null) {
					articles[val] = []
					for(let i in articleResult.result) {
						if(lodash.indexOf(slideIds, articleResult.result[i].id) === -1) {
							articles[val].push(articleResult.result[i])
						} 
					}
					
					// console.log(articleResult.result)
					// products.push({
					// 	'name': shopLayout['product'][i]['name'],
					// 	'value': productsResult.result
					// })
				}
			}
		}

		console.log( {
			slideArticles, 
			categories, 
			articles
		})

		return {
			slideArticles, 
			categories, 
			articles
		}
	}


	async gardenProducts(userId, id) {
		let productTypes, slideProducts, products


		const layout = config.get('layout');

		const shopLayout = layout[userId]

		const channelInfo = shopLayout['product'][id]

		if(channelInfo) {
			const productTypeIds = lodash.split(channelInfo.typeIds, ',')

			if (productTypeIds) {
				const productTypeAdapter = new ProductTypeAdapter();
				const productTypeResult = await productTypeAdapter.get({ idList: productTypeIds }, ProductType);

				productTypes = productTypeResult
			}

			const pages = {
				number: 1,
		        size: 40
			}

			const filters = {
			    productType: channelInfo.typeIds,
			    status: PRODUCT_STATUS_ON_SALE
			};

			const sort = '-id';

			const productAdapter = new ProductAdapter();
			const productsResult = await productAdapter.get({
				filters,
				pages,
				sort
			}, Product);

			// console.log(productsResult)

			if (productsResult !== null) {
				slideProducts = []
				for(let i = 0; i < 5; i++ ) {
					if (productsResult.result.length > 0) {
						slideProducts.push(productsResult.result.shift())
					}
				}
				products = productsResult.result
				// products.push({
				// 	'name': shopLayout['product'][i]['name'],
				// 	'value': productsResult.result
				// })
			}
		}

		return {
			productTypes, 
			slideProducts, 
			products
		}
	}


	async gardenProjects(userId, id) {

		let channelInfo, projects

		const layout = config.get('layout');

		const shopLayout = layout[userId]

		channelInfo = shopLayout['project'][id]


		if(channelInfo) {
			console.log(channelInfo)


			const pages = {
					number: 1,
			        size: 40
				}

			const filters = {
			    projectType: channelInfo['typeIds'],
			    status: PROJECT_STATUS_PUBLISH,
			    category: PROJECT_CATEGORY_B2C
			};

			const projectAdapter = new ProjectAdapter();
			const projectResult = await projectAdapter.get({
				filters,
				pages
				// sort
			}, Project);	

			if (projectResult !== null) {

				projects = projectResult.result

			}
		}


		return {
			channelInfo,
			projects
		}
	}
}