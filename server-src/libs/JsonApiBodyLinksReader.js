export default class JsonApiBodyLinksReader {
	constructor(links) {
		this.links = links
	}

	value(key) {
		return this.links[key];
	}
}