import Translator from '../../libs/Translator'
import MemberGroupJsonApiBodyReader from '../reader/MemberGroupJsonApiBodyReader'

export default class MemberGroupTranslator extends Translator {
  readData (data) {
    const bodyReader = new MemberGroupJsonApiBodyReader(data)

    const id = bodyReader.value('id')
    const name = bodyReader.value('name')
    const category = bodyReader.value('category')
    const status = bodyReader.value('status')
    const purview = bodyReader.value('purview')
    const shop = bodyReader.value('shop')
    const createTime = bodyReader.value('createTime')
    const updateTime = bodyReader.value('updateTime')
    const statusTime = bodyReader.value('statusTime')

    return {
      id,
      name,
      category,
      purview,
      status,
      shop,
      createTime,
      updateTime,
      statusTime
    }
  }
}
