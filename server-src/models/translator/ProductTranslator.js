import Translator from '../../libs/Translator';
import ProductJsonApiBodyReader from '../reader/ProductJsonApiBodyReader';

export default class ProductTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data, included) {
        const bodyReader = new ProductJsonApiBodyReader(data, included);

        let id          = bodyReader.value('id');
        let name        = bodyReader.value('name');
        let category    = bodyReader.value('category');
        let feature     = bodyReader.value('feature');
        let logo        = bodyReader.value('logo');
        let minPrice    = bodyReader.value('minPrice');
        let maxPrice    = bodyReader.value('maxPrice');
        let description = bodyReader.value('productDescription').description;
        let slides      = bodyReader.value('productSlides').slides;
        let prices      = bodyReader.value('productPrices').prices;
        let updateTime  = bodyReader.value('updateTime');
        let createTime  = bodyReader.value('createTime');
        let statusTime  = bodyReader.value('statusTime');
        let status      = bodyReader.value('status');
        let visible     = bodyReader.value('visible');

        let user        = bodyReader.value('users');
        let productType = bodyReader.value('productTypes');
        let snapshots   = bodyReader.value('snapshots');

        return { id, name, category, feature, logo, minPrice, maxPrice, description, slides, prices, updateTime, createTime, statusTime, status, visible, user, productType, snapshots};
    }

    static convertSnapshot(data) {
        const id          = data.id
        const name        = data.name
        const category    = data.category
        const feature     = data.feature
        const logo        = data.logo
        const minPrice    = data.minPrice
        const maxPrice    = data.maxPrice
        const description = data.productDescription.description 
        const slides      = data.productSlides.slides
        const prices      = data.productPrices.prices
        const updateTime  = data.updateTime
        const createTime  = data.createTime
        const statusTime  = data.statusTime
        const status      = data.status
        const visible     = data.visible

        const user        = data.users 
        const productType = data.productTypes

        return { id, name, category, feature, logo, minPrice, maxPrice, description, slides, prices, updateTime, createTime, statusTime, status, visible, user, productType};
	}
}