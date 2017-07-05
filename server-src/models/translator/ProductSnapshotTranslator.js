import Translator from '../../libs/Translator'
import ProductSnapshotJsonApiBodyReader from '../reader/ProductSnapshotJsonApiBodyReader'
import Product from '../model/Product'
import ProductTranslator from './ProductTranslator'
export default class ProductSnapshotTranslator extends Translator {
  constructor () {
    super()
  }

  readData (data, included) {
    const bodyReader = new ProductSnapshotJsonApiBodyReader(data, included)

    const id = bodyReader.value('id')
    const commonProducts = bodyReader.value('commonProducts')
    const product = new Product(ProductTranslator.convertSnapshot(commonProducts))

    return {
      id,
      product
    }
  }
}
