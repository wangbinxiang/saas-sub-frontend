import IndexService from '../models/application/IndexService';
import ProductService from '../models/application/ProductsService';
import config from 'config';


export default async(ctx, next) => {
    const title = '首页';

    // if (ctx.isAuthenticated()) {
    //     console.log('isAuthenticated');
    //     console.log(ctx.state.user);
    //     // ctx.logout();
    // }



    let number = ctx.query.number ? ctx.query.number : 1;

    let size = ctx.query.size ? ctx.query.size : 500;

    let filters = {
        //userId: ctx._subId,
        userId: ctx._subId,
        status: 0
    };

    let pages = {
        number,
        size
    };


    let products = null;

    let isNext = false;

    const indexService = new IndexService();

    let result = await indexService.index(filters, {
        number,
        size
    });

    if (result !== null) {
        let page = result.page;
        products = result.products;

        if (page && page.haveNext()) {
            isNext = true;
        }
    }



    // console.log(products);
    // console.log(isNext);

    const pageJs = webpackIsomorphicTools.assets().javascript.index;

    const imgHost = config.get('qiniu.bucket.subImg.url');

    const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');

    //幻灯片
    let slidesData = [];
    if (ctx._shop.slides) {
        const poductService = new ProductService();
        let products = await poductService.get(ctx._shop.slides, ctx._subId);
        if (products) {
            for (let i in products) {
                slidesData.push({
                    "url": '/products/' + products[i].id,
                    "title": products[i].name,
                    "price": products[i].minPrice,
                    "img": imgHost + products[i].logo
                });
            }
        }
    }

    await ctx.render('index/index', {
        title,
        slidesData,
        products,
        isNext,
        number,
        pageJs,
        imgHost,
        imgStyle
    })
}

export async function category(ctx, next) {
    const title = '类别';
    const pageJs = webpackIsomorphicTools.assets().javascript.cata;
    const data = {
        "lbs": [{
            "id": 123,
            "lb": "London"
        }, {
            "id": 124,
            "lb": "美食"
        }, {
            "id": 123,
            "lb": "独立成团"
        }, {
            "id": 124,
            "lb": "酒店"
        }, {
            "id": 123,
            "lb": "邮轮"
        }, {
            "id": 124,
            "lb": "购物"
        }, {
            "id": 123,
            "lb": "ChongQing"
        }, {
            "id": 124,
            "lb": "HangZhou"
        }, {
            "id": 125,
            "lb": "QingDao"
        }],
        "items": [{
            "id": 10,
            "title": "Tincidunt integer eu",
            "price": 15783,
            "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
        }, {
            "id": 11,
            "title": "Tincidunt integer eu integer eu integer eu",
            "price": 15784,
            "img": "/img/170_200/150711-n-ru971-772.jpg"
        }, {
            "id": 12,
            "title": "Tincidunt integer eu",
            "price": 15785,
            "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
        }, {
            "id": 13,
            "title": "Tincidunt integer eu integer eu",
            "price": 15786,
            "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg"
        }, {
            "id": 14,
            "title": "Tincidunt integer eu",
            "price": 15787,
            "img": "/img/170_200/city_skyline.jpeg"
        }, {
            "id": 15,
            "title": "Tincidunt integer eu Tincidunt integer eu",
            "price": 888,
            "img": "/img/170_200/fcfa8905-7145-4b81-acad-255c13ae0221.jpg"
        }, {
            "id": 15,
            "title": "Tincidunt integer eu Tincidunt integer eu",
            "price": 888,
            "img": "/img/170_200/golden_gate_bridge.jpg"
        }, {
            "id": 15,
            "title": "Tincidunt integer eu Tincidunt integer eu",
            "price": 888,
            "img": "/img/170_200/horses.jpg"
        }, {
            "id": 10,
            "title": "Tincidunt integer eu",
            "price": 15783,
            "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
        }, {
            "id": 11,
            "title": "Tincidunt integer eu integer eu integer eu",
            "price": 15784,
            "img": "/img/170_200/150711-n-ru971-772.jpg"
        }, {
            "id": 12,
            "title": "Tincidunt integer eu",
            "price": 15785,
            "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
        }, {
            "id": 13,
            "title": "Tincidunt integer eu integer eu",
            "price": 15786,
            "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg"
        }, {
            "id": 14,
            "title": "Tincidunt integer eu",
            "price": 15787,
            "img": "/img/170_200/city_skyline.jpeg"
        }, {
            "id": 15,
            "title": "Tincidunt integer eu Tincidunt integer eu",
            "price": 888,
            "img": "/img/170_200/fcfa8905-7145-4b81-acad-255c13ae0221.jpg"
        }, {
            "id": 15,
            "title": "Tincidunt integer eu Tincidunt integer eu",
            "price": 888,
            "img": "/img/170_200/golden_gate_bridge.jpg"
        }, {
            "id": 15,
            "title": "Tincidunt integer eu Tincidunt integer eu",
            "price": 888,
            "img": "/img/170_200/horses.jpg"
        }]
    }
    await ctx.render('index/category', {
        title,
        pageJs,
        data
    });
}

export async function detail(ctx, next) {
    const title = '商品详情';
    const pageJs = webpackIsomorphicTools.assets().javascript.detail;
    const data = null
    await ctx.render('index/detail', {
        title,
        pageJs,
        data
    });
}

export async function orderConfirm(ctx, next) {
    const title = '订单确认';
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    const data = {
        goods: [{
            "id": 123,
            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
            "sku": 'red',
            "price": 25670,
            "quantity": 1230
        }, {
            "id": 124,
            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
            "sku": 'red',
            "price": 25671,
            "quantity": 1231
        }, {
            "id": 125,
            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
            "sku": 'red',
            "price": 25672,
            "quantity": 1232
        }],
        addresses: [{
            "id": 123,
            "name": "Mi id sollicitudin",
            "mobile": "15098765432",
            "where": "山西-西安-莲湖区",
            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
        }, {
            "id": 124,
            "name": "Mi jd sollicitudin",
            "mobile": "15098765432",
            "where": "山西-西安-莲区",
            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
        }, {
            "id": 125,
            "name": "Mi kd sollicitudin",
            "mobile": "15098765432",
            "where": "山西-西安-湖区",
            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
        }, ],
        totalGoods: 1256,
        deliveryFee: 100
    }
    await ctx.render('index/orderConfirm', {
        title,
        pageJs,
        data
    });
}

export async function orders(ctx, next) {
    const title = '我的订单';
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    const data = {
        orders: [{
            "id": 123,
            status: 1,
            "total": 12556,
            "dateOrder": "2016-06-25 12:25",
            "datePay": "-"
        }, {
            "id": 124,
            status: 2,
            "total": 125,
            "dateOrder": "2016-05-25 12:25",
            "datePay": "2016-05-25 12:25"
        }, {
            "id": 125,
            status: 3,
            "total": 9,
            "dateOrder": "2016-04-25 12:25",
            "datePay": "2016-04-25 12:25"
        }]
    }
    await ctx.render('index/orders', {
        title,
        pageJs,
        data
    });
}

export async function order(ctx, next) {
    const title = '订单详情';
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    const data = {
        goods: [{
            "id": 123,
            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
            "sku": 'red',
            "price": 25670,
            "quantity": 1230
        }, {
            "id": 124,
            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
            "sku": 'red',
            "price": 25671,
            "quantity": 1231
        }, {
            "id": 125,
            "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
            "sku": 'red',
            "price": 25672,
            "quantity": 1232
        }],
        addresses: [{
            "id": 123,
            "name": "Mi id sollicitudin",
            "mobile": "15098765432",
            "where": "山西-西安-莲湖区",
            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
        }, {
            "id": 124,
            "name": "Mi jd sollicitudin",
            "mobile": "15098765432",
            "where": "山西-西安-莲区",
            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
        }, {
            "id": 125,
            "name": "Mi kd sollicitudin",
            "mobile": "15098765432",
            "where": "山西-西安-湖区",
            "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
        }, ],
        totalGoods: 1256,
        deliveryFee: 100,
        step: 1
    }
    await ctx.render('index/order', {
        title,
        pageJs,
        data
    });
}