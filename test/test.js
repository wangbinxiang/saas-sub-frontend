import test from 'ava';
import {
	assert,
	expect,
	should
} from 'chai';
import {
	buildJsonApiIdsUrl,
	buildJsonApiQueryUrl,
	buildJsonApiGetUrl
} from '../server-src/libs/helper';

should();

// test('foo', t => {
//     t.pass();
// });

// test('bar', async t => {
//     const bar = Promise.resolve('bar');

//     t.is(await bar, 'bar');
// });


test('helper buildJsonApiIdsUrl ', t => {
	const id = 123;
	const idList = [2, 3, 4];
	const errId = '123';

	let idString = buildJsonApiIdsUrl(id);

	expect(idString).to.be.a('string');
	idString.should.equal('123');
	idString.should.have.length(3);
	assert.equal(idString, id.toString());

	t.is(idString, id.toString());

	idString = buildJsonApiIdsUrl(idList);
	t.is(idString, idList.join());

	idString = buildJsonApiIdsUrl(errId);

	t.is(idString, undefined);
});


test('helper buildJsonApiQueryUrl', t => {
	const filters = {
		userId: 123
	};

	const page = {
		number: 5,
		size: 16
	};

	let url = buildJsonApiQueryUrl(filters, page);

	t.is(url, '?filter[userId]=123&page[number]=5&page[size]=16');


	url = buildJsonApiQueryUrl(filters, {});
	t.is(url, '?filter[userId]=123');

	url = buildJsonApiQueryUrl({}, page);
	t.is(url, '?page[number]=5&page[size]=16');
});

test('helper buildJsonApiGetUrl', t => {
	const filters = {
		userId: 123
	};

	const page = {
		number: 5,
		size: 16
	};

	let baseUrl = '/products';

	const idList = [2, 3, 4];

	let idStringUrl = buildJsonApiIdsUrl(idList);


	let queryUrl = buildJsonApiQueryUrl(filters, page);

	let url = buildJsonApiGetUrl(baseUrl, idStringUrl, queryUrl);

	t.is(url, '/products/2,3,4?filter[userId]=123&page[number]=5&page[size]=16');


	url = buildJsonApiGetUrl(baseUrl, '', queryUrl);

	t.is(url, '/products?filter[userId]=123&page[number]=5&page[size]=16');


	url = buildJsonApiGetUrl(baseUrl, idStringUrl, '');

	t.is(url, '/products/2,3,4');


	url = buildJsonApiGetUrl(baseUrl, '', '');

	t.is(url, '/products');
});


