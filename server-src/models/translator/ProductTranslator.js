import Translator from '../../libs/Translator';
import ProductJsonApiBodyReader from '../reader/ProductJsonApiBodyReader';

export default class ProductTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new ProductJsonApiBodyReader(data);

        let id          = bodyReader.value('id');
        let name        = bodyReader.value('name');
        let category    = bodyReader.value('category');
        let feature     = bodyReader.value('feature');
        let logo        = bodyReader.value('logo');
        let minPrice    = bodyReader.value('minPrice');
        let maxPrice    = bodyReader.value('maxPrice');
        let description = bodyReader.value('description');
        let slides      = bodyReader.value('slides');
        let prices      = bodyReader.value('prices');
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
}