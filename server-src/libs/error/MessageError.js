/**
 * 异常消息类，用于操作错误传递错误消息。
 * 
 * @export
 * @class MessageError
 * @extends {Error}
 */
export default class MessageError extends Error {
    
	/**
     * Creates an instance of MessageError.
     * @param {any} message 异常消息
     * @param {number} [status=400] http状态，默认400
     * @param {boolean} [expose=true] 是否显示异常消息，默认显示
     * 
     * @memberOf MessageError
     */
    constructor(message, status = 400, expose = true) {
		super();
        this.message = message
        this.status = status;
        this.expose = expose;
	}
}