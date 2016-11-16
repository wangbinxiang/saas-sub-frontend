import ProductAdapter from '../adapter/ProductAdapter';
import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import Product from '../model/Product';
import ProductType from '../model/ProductType';
import {
    PRODUCT_STATUS_ON_SALE
} from '../../config/productConf';

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
}