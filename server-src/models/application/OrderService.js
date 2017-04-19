import ProductAdapter from '../adapter/ProductAdapter';
import Product from '../model/Product';
import OrderAdapter from '../adapter/OrderAdapter';
import Order from '../model/Order';
import ProductSnapshotAdapter from '../adapter/ProductSnapshotAdapter';
import ProductSnapshot from '../model/ProductSnapshot';
import ProductTypeAdapter from '../adapter/ProductTypeAdapter';
import ProductType from '../model/ProductType';
import ContractAdapter from '../adapter/ContractAdapter';
import Contract from '../model/Contract';
import ContractSnapshotAdapter from '../adapter/ContractSnapshotAdapter';
import ContractSnapshot from '../model/ContractSnapshot';
import AccountAdapter from '../adapter/AccountAdapter';
import Account from '../model/Account';
import lodash from 'lodash';
import {
	checkOther
} from '../../libs/helper';
import {
	ORDER_PAY_TYPE_NORMAL,
	ORDER_PAY_TYPE_THIRD,
	ORDER_PAY_TYPE_OFFLINE,
	ORDER_PAY_TYPE_NAME_LIST
} from '../../config/orderConf';


export default class OrderService {

	constructor() {
		this.productAdapter = new ProductAdapter();
		this.orderAdapter = new OrderAdapter();
	}

	async showAddOrder(productId, priceOrder, productNum, shopId, userId) {
		//获取产品信息
		const include = ['prices']
		let product = await this.productAdapter.get({
			idList: productId,
			include
		}, Product);
		if (product === null || !product.isOnSale() || (!checkOther(productId, shopId) && !product.own(shopId))) {
			return null;
		} else {

			//获取用户信息
			const accountAdapter = new AccountAdapter();
			const account = await accountAdapter.get({
				idList: userId
			}, Account)

			//获取分类信息
			//
			//获取合同信息
			const productTypeAdapter = new ProductTypeAdapter();
			const productType = await productTypeAdapter.get({
				'idList': product.productTypeId
			}, ProductType);

			let contract = null;

			if (productType !== null && productType.contractId > 0) {
				//获取合同信息
				const contractAdapter = new ContractAdapter();
				contract = await contractAdapter.get({
					idList: productType.contractId
				}, Contract);
			}


			//获取价格信息
			let priceInfo = product.prices[priceOrder];

			//获取总价格
			let totalPrice = priceInfo.price * productNum;

			return {
				product,
				priceInfo,
				totalPrice,
				contract,
				account
			};
		}
	}

	async showMulitAddOrder(productsInfo) {
		const productIds = lodash.keys(productsInfo)

		if(productIds) {
			const include = ['prices']
			let products = await this.productAdapter.get({
				idList: productIds,
				include
			}, Product);

			if(products === null) {
				return null
			} else {
				let totalPrice = 0

				for(let product of products) {
					if(productsInfo[product.id]) {
						for(let price of productsInfo[product.id]) {
							if(product.prices[price.index]) {
								totalPrice += product.prices[price.index].price * price.number
							}
						}
					}
				}
				//获取分类信息
				//
				//获取合同信息
				
				return {
					products,
					totalPrice,
				};
			}
		}
	}

	/**
	 * 搜索订单
	 * @author wangbinxiang
	 * @date   2016-11-03T14:40:03+0800
	 * @param  {[type]}                 filters [description]
	 * @param  {[type]}                 pages   [description]
	 * @return {[type]}                         [description]
	 */
	async search(filters, pages) {
		const sort = '-id';
		let result = await this.orderAdapter.get({
			filters,
			pages,
			sort
		}, Order);

		if (result === null) {
			return null;
		} else {
			return {
				page: result.page,
				orders: result.result
			};
		}
	}


	async detail(id, userId, shopId) {
		id =  +id
		if(!lodash.isInteger(id) || id <= 0) {
			return null
		}
		let order = await this.orderAdapter.get({
			idList: id
		}, Order);
		console.log(order)
		if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
			return null;
		} else {
			//获取用户信息
			const accountAdapter = new AccountAdapter();
			const account = await accountAdapter.get({
				idList: userId
			}, Account)



			let productSnapshot;
			let contractSnapshot;
			let snapshotIds = [];
			let contractSnapshotIds = [];
			for (let snapshot of order.products) {
				snapshotIds.push(snapshot.snapshot);
				contractSnapshotIds.push(snapshot.contractSnapshot);
			}
			console.log(snapshotIds)

			if (snapshotIds.length) {
				const productSnapshotAdapter = new ProductSnapshotAdapter();
				const include = ['prices']
				productSnapshot = await productSnapshotAdapter.get({
					idList: snapshotIds,
					include
				}, ProductSnapshot);
			}
			console.log(productSnapshot)

			if (contractSnapshotIds.length) {
				const contractSnapshotAdapter = new ContractSnapshotAdapter();
				contractSnapshot = await contractSnapshotAdapter.get({
					idList: contractSnapshotIds
				}, ContractSnapshot)

			}


			if (productSnapshot) {
				for (let key in order.products) {
					const snapshotKey = lodash.findIndex(productSnapshot, function (snapshot) {
						return snapshot.id === order.products[key].snapshot;
					});
					order.products[key]['productSnapshot'] = productSnapshot[snapshotKey];
					console.log(order.products[key])
					const contractSnapshotKey = lodash.findIndex(contractSnapshot, function (o) {
						return o.id === order.products[key].contractSnapshot;
					});
					if (contractSnapshotKey > -1) {
						order.products[key]['contractSnapshot'] = contractSnapshot[contractSnapshotKey];
					}

				}
			}
			return {
				order,
				account
			}
		}
	}

	async showThirdPay(id, userId, shopId) {
		let order = await this.orderAdapter.get({
			idList: id
		}, Order);

		if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
			return null;
		} else {

			//获取用户信息
			const accountAdapter = new AccountAdapter();
			const account = await accountAdapter.get({
				idList: userId
			}, Account)


			return {
				order,
				account
			}
		}
	}


	async thirdPay(id, userId, shopId) {
		let order = await this.orderAdapter.get({
			idList: id
		}, Order);

		if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
			return null;
		} else {
			return await this.orderAdapter.pay({
				id,
				payType: ORDER_PAY_TYPE_THIRD
			}, Order);
		}
	}


	async offlinePay(id, payComment, userId, shopId) {
		let order = await this.orderAdapter.get({
			idList: id
		}, Order);

		if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
			return null;
		} else {
			return await this.orderAdapter.pay({
				id,
				payComment,
				payType: ORDER_PAY_TYPE_OFFLINE
			}, Order);
		}
	}

	async addOrder(userId, shopId, comment, productList) {
		//获取产品信息
		const product = await this.productAdapter.get({
			idList: productList[0].productId
		}, Product);
		if (product === null || !product.isOnSale() || (!checkOther(productList[0].productId, shopId) && !product.own(shopId))) {
			return null;
		} else {

			return await this.orderAdapter.add({
				userId,
				shopId,
				price,
				comment,
				productList
			}, Order);
		}
	}

	async mulitAddOrder(userId, shopId, comment, productsInfo) {
		const productIds = lodash.keys(productsInfo)
		if(productIds) {
			const include = ['prices']
			let products = await this.productAdapter.get({
				idList: productIds,
				include
			}, Product);

			if(products === null) {
				return null
			} else {
				let totalPrice = 0
				const productList = []
				for(let product of products) {
					if(productsInfo[product.id]) {
						for(let price of productsInfo[product.id]) {
							if(lodash.isEmpty(product.prices[price.index])) {
								return null
							}
							productList.push({
								productId: product.id,
								number: price.number,
								priceIndex: price.index
							})
						}
					} else {
						return null
					}
				}

				return await this.orderAdapter.add({
					userId,
					shopId,
					comment,
					productList
				}, Order);
			}
		}	
	}


	async pay(id) {
		return await this.orderAdapter.pay({
			id
		}, Order);
	}

	async confirmPay(id) {
		return await this.orderAdapter.confirmPay({
			id
		}, Order);
	}


}