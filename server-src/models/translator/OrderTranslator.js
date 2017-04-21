import Translator from '../../libs/Translator'
import OrderJsonApiBodyReader from '../reader/OrderJsonApiBodyReader'

export default class OrderTranslator extends Translator {
    constructor() {
        super()
    }


    readData(data, included) {
        const bodyReader = new OrderJsonApiBodyReader(data, included)

        const id            = bodyReader.value('id')
        const price         = bodyReader.value('price')
        const payType       = bodyReader.value('payType')
        const category      = bodyReader.value('category')
        const payTime       = bodyReader.value('payTime')
        const systemComment = bodyReader.value('systemComment')
        const payComment    = bodyReader.value('payComment')
        const comment       = bodyReader.value('comment')
        const freight       = bodyReader.value('freight')
        const users         = bodyReader.value('users')
        const shops         = bodyReader.value('shops')
        const orderProducts = bodyReader.value('orderProducts')
        const updateTime    = bodyReader.value('updateTime')
        const createTime    = bodyReader.value('createTime')
        const statusTime    = bodyReader.value('statusTime')
        const status        = bodyReader.value('status')

        return {
            id,
            price,
            payType,
            category,
            payTime,
            systemComment,
            payComment,
            comment,
            freight,
            users,
            shops,
            orderProducts,
            updateTime,
            createTime,
            statusTime,
            status
        }
    }
}