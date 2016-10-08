
/**
 * json api 分页信息类
 */
export default class Page {
	/**
	 * [constructor description]
	 * @author wangbinxiang
	 * @date   2016-09-28T22:06:13+0800
	 * @param  {string}                 options.first 上一页地址
	 * @param  {string}                 options.last  最后一页地址
	 * @param  {string}                 options.prev  上一页地址
	 * @param  {string}                 options.next  下一页地址
	 */
	constructor({ first, last, prev, next }) {
		this.first = first;
		this.last = last;
		this.prev = prev;
		this.next = next
	}

	haveNext() {
		return this.next !== null;
	}
}