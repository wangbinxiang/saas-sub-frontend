import request from 'request-json'
import Promise from 'bluebird'

/**
 * jsonApi promise 请求类
 * @author 王斌翔
 */
export default class RequestJsonApi {
  constructor (host, url, data) {
    // 初始化请求地址
    this.client = request.createClient(host)
    this.url = url
    this.data = data
  }

  promiseThunk (resolve, reject) {
    return (err, header, body) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          header,
          body
        })
      }
    }
  }

  promise (func) {
    return new Promise(func)
  }

  get () {
    const that = this
    return this.promise((resolve, reject) => {
      console.log(that.url)
      that.client.get(that.url, that.data, that.promiseThunk(resolve, reject))
    })
  }

  post () {
    const that = this
    return this.promise((resolve, reject) => {
      that.client.post(that.url, that.data, that.promiseThunk(resolve, reject))
    })
  }

  put () {
    const that = this
    return this.promise((resolve, reject) => {
      that.client.put(that.url, that.data, that.promiseThunk(resolve, reject))
    })
  }

  del () {
    const that = this
    return this.promise((resolve, reject) => {
      that.client.del(that.url, that.data, that.promiseThunk(resolve, reject))
    })
  }

  sendFile () {
    const that = this
    return this.promise((resolve, reject) => {
      that.client.sendFile(that.url, that.data.path, that.data.name, (err, header, body) => {
        if (err) {
          reject(err)
        } else {
          try {
            body = JSON.parse(body)
          } catch (e) {
            reject(err)
          }
          resolve({
            header,
            body
          })
        }
      })
    })
  }
}
