import _ from 'lodash'
import JsonApiBodyReader from './JsonApiBodyReader'

export default class JsonApiBodyRelationshipReader extends JsonApiBodyReader {
  relationshipToData (key, value, data) {
    if (_.isArray(value.data)) {
        // 如果有relationship并且是数组
      data[key] = []
      if (value.data.length > 0) {
        for (let info of value.data) {
            //  数据存储改为 relationship
          data[key].push(this.relationshipInfoFormIncluded(info.type, info.id))
        }
      }
    } else if (value.data && value.data.type) {
        // 如果有relationship 是单个数据
      data[key] = this.relationshipInfoFormIncluded(value.data.type, value.data.id)
    }
  }
}
