import JsonApiBodyRelationshipReader from '../../libs/JsonApiBodyRelationshipReader'

/**
 * 分销商品 jsonapi 数据读取类
 *
 * @export
 * @class DistributionJsonApiBodyReader
 * @extends {JsonApiBodyRelationshipReader}
 */
export default class ProductProxyJsonApiBodyReader extends JsonApiBodyRelationshipReader {
  constructor (...args) {
    super(...args)
  }
}
