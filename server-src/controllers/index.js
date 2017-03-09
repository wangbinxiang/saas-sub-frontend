import IndexService from '../models/application/IndexService';
import ProductService from '../models/application/ProductService';
import ArticlesService from '../models/application/ArticlesService';
import ProjectService from '../models/application/ProjectService';
import {
    PROJECT_STATUS_PUBLISH,
    PROJECT_CATEGORY_B2C
} from '../config/projectConf';
import {
    ARTICLE_STATUS_PUBLISH
} from '../config/articleConf';
import config from 'config';
import lodash from 'lodash';

import {
    SHOP_SLIDES_TYPE_PRODUCT,
    SHOP_SLIDES_TYPE_ARTICLE,
    SHOP_SLIDES_TYPE_PROJECT,
    SHOP_SLIDES_TYPE_NAMES
} from '../config/shopConf'

import {
    slideStyle,
    slideOneStyle,
    listStyle
} from '../tools/imgStyle';

export async function index(ctx, next) {
    
    const title = '首页 - ' + ctx._shop.title;
    const imgHost = config.get('qiniu.bucket.subImg.url');

    const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');

    const imgListStyle = listStyle(ctx)

    //幻灯片
    let slidesData = [];

    if (ctx._shop.slides && ctx._shop.slides.length) {
        let productIds = []
        let articleIds = []
        let projectIds = []

        for(let val of ctx._shop.slides) {
            if (lodash.isString(val)) {
                productIds.push(val)
            } else if(val.id && val.slideType){
                switch(parseInt(val.slideType)) {
                    case SHOP_SLIDES_TYPE_PRODUCT:
                        productIds.push(val.id)
                        break;
                    case SHOP_SLIDES_TYPE_ARTICLE:
                        articleIds.push(val.id)
                        break;
                    case SHOP_SLIDES_TYPE_PROJECT:
                        projectIds.push(val.id)
                        break;
                }
            }
        }
        if (productIds.length > 0) {
            const poductService = new ProductService();
            let products = await poductService.get(productIds, ctx._subId);
            if (products) {
                for (let i in products) {
                    slidesData.push({
                        slideType: SHOP_SLIDES_TYPE_PRODUCT,
                        id: products[i].id,
                        title: products[i].name,
                        img: imgHost + products[i].logo,
                        url: '/products/' + products[i].id,
                        price: products[i].minPrice
                    });
                }
            }
        }

        if (articleIds.length > 0) {
            const articlesService = new ArticlesService()
            const articles = await articlesService.get(articleIds)
            if (articles) {
                for (let i in articles) {
                    slidesData.push({
                        slideType: SHOP_SLIDES_TYPE_ARTICLE,
                        id: articles[i].id,
                        title: articles[i].title,
                        img: imgHost + articles[i].logo,
                        url: '/articles/' + articles[i].id
                    });
                }
            }
        }

        if (projectIds.length > 0) {
            const projectService = new ProjectService()
            const projects = await projectService.get(projectIds)

            if (projects) {
                for (let i in projects) {
                    slidesData.push({
                        slideType: SHOP_SLIDES_TYPE_PROJECT,
                        id: projects[i].id,
                        title: projects[i].name,
                        img: imgHost + projects[i].logo,
                        url: '/projects/' + projects[i].id
                    });
                }
            }
        }
    }

    if (ctx.state.shopInfo.theme && ctx.state.shopInfo.theme == 'garden') {
        //园林首页
        const pageJs = webpackIsomorphicTools.assets().javascript.index;

        const indexService = new IndexService();  

        const imgSlideOneStyle = slideOneStyle(ctx)


        //页面数据
        const info = await indexService.garden(ctx._subId);

        const blocks = info.projects.concat(info.products);

        await ctx.render('garden/index', {
            title, 
            pageJs,
            slidesData,
            info, 
            blocks,
            imgHost,
            imgStyle,
            imgSlideOneStyle,
            imgListStyle,
            SHOP_SLIDES_TYPE_PRODUCT,
            SHOP_SLIDES_TYPE_ARTICLE,
            SHOP_SLIDES_TYPE_PROJECT,
        });

    } else {
        let isNext = false;

        // if (ctx.isAuthenticated()) {
        //     console.log('isAuthenticated');
        //     console.log(ctx.state.user);
        //     // ctx.logout();
        // }

        const number = ctx.query.number ? ctx.query.number : 1;

        const size = ctx.query.size ? ctx.query.size : 10;

        const indexService = new IndexService();

        // const result = await indexService.index(number, size, ctx._subId);
        let { page, products} = await indexService.index(number, size, ctx._subId);
        if (page && page.haveNext()) {
            isNext = true;
        }


        // // 获取当前是否有
        const other = config.get('productMapping');

        if (other[ctx._subId]) {
            const otherIds = lodash.sample(other[ctx._subId]);
            const productService = new ProductService();
            const otherProducts = await productService.list(otherIds);
            if (otherProducts) {
                products = lodash.concat(products, otherProducts);
            }
        }


        //获取项目与定制
        let projects = null
        const projectService = new ProjectService()
        const projectsResult = await projectService.index({
                userId: ctx._subId,
                status: PROJECT_STATUS_PUBLISH,
                category: PROJECT_CATEGORY_B2C
            }, {
                number: 1,
                size: 10
            })
        if (projectsResult) {
            projects = projectsResult.projects
        }
        //获取咨询
        let articles = null
        const articlesService = new ArticlesService()
        const articlesResult = await articlesService.index({
                userId: ctx._subId,
                status: ARTICLE_STATUS_PUBLISH,
            }, {
                number: 1,
                size: 10
            })
        if (articlesResult) {
            articles = articlesResult.articles
        }


        if (ctx.accepts('html', 'text', 'json') === 'json') {
            ctx.body = {
                products,
                isNext
            };
        } else {

            const pageJs = webpackIsomorphicTools.assets().javascript.index;

            const imgHost = config.get('qiniu.bucket.subImg.url');

            const imgStyle = config.get('qiniu.bucket.subImg.style.productWaterFall');

            const imgSlideStyle = slideStyle(ctx)

            await ctx.render('index/index', {
                title,
                slidesData,
                products,
                projects,
                articles,
                isNext,
                number,
                pageJs,
                imgHost,
                imgStyle,
                imgSlideStyle,
                imgListStyle,
                SHOP_SLIDES_TYPE_PRODUCT,
                SHOP_SLIDES_TYPE_ARTICLE,
                SHOP_SLIDES_TYPE_PROJECT,
            });
        } 
    }   
}

// export async function category(ctx, next) {
//     const title = '类别';
//     const pageJs = webpackIsomorphicTools.assets().javascript.cata;
//     const data = {
//         "lbs": [{
//             "id": 123,
//             "lb": "London"
//         }, {
//             "id": 124,
//             "lb": "美食"
//         }, {
//             "id": 123,
//             "lb": "独立成团"
//         }, {
//             "id": 124,
//             "lb": "酒店"
//         }, {
//             "id": 123,
//             "lb": "邮轮"
//         }, {
//             "id": 124,
//             "lb": "购物"
//         }, {
//             "id": 123,
//             "lb": "ChongQing"
//         }, {
//             "id": 124,
//             "lb": "HangZhou"
//         }, {
//             "id": 125,
//             "lb": "QingDao"
//         }],
//         "items": [{
//             "id": 10,
//             "title": "Tincidunt integer eu",
//             "price": 15783,
//             "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
//         }, {
//             "id": 11,
//             "title": "Tincidunt integer eu integer eu integer eu",
//             "price": 15784,
//             "img": "/img/170_200/150711-n-ru971-772.jpg"
//         }, {
//             "id": 12,
//             "title": "Tincidunt integer eu",
//             "price": 15785,
//             "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
//         }, {
//             "id": 13,
//             "title": "Tincidunt integer eu integer eu",
//             "price": 15786,
//             "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg"
//         }, {
//             "id": 14,
//             "title": "Tincidunt integer eu",
//             "price": 15787,
//             "img": "/img/170_200/city_skyline.jpeg"
//         }, {
//             "id": 15,
//             "title": "Tincidunt integer eu Tincidunt integer eu",
//             "price": 888,
//             "img": "/img/170_200/fcfa8905-7145-4b81-acad-255c13ae0221.jpg"
//         }, {
//             "id": 15,
//             "title": "Tincidunt integer eu Tincidunt integer eu",
//             "price": 888,
//             "img": "/img/170_200/golden_gate_bridge.jpg"
//         }, {
//             "id": 15,
//             "title": "Tincidunt integer eu Tincidunt integer eu",
//             "price": 888,
//             "img": "/img/170_200/horses.jpg"
//         }, {
//             "id": 10,
//             "title": "Tincidunt integer eu",
//             "price": 15783,
//             "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
//         }, {
//             "id": 11,
//             "title": "Tincidunt integer eu integer eu integer eu",
//             "price": 15784,
//             "img": "/img/170_200/150711-n-ru971-772.jpg"
//         }, {
//             "id": 12,
//             "title": "Tincidunt integer eu",
//             "price": 15785,
//             "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"
//         }, {
//             "id": 13,
//             "title": "Tincidunt integer eu integer eu",
//             "price": 15786,
//             "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg"
//         }, {
//             "id": 14,
//             "title": "Tincidunt integer eu",
//             "price": 15787,
//             "img": "/img/170_200/city_skyline.jpeg"
//         }, {
//             "id": 15,
//             "title": "Tincidunt integer eu Tincidunt integer eu",
//             "price": 888,
//             "img": "/img/170_200/fcfa8905-7145-4b81-acad-255c13ae0221.jpg"
//         }, {
//             "id": 15,
//             "title": "Tincidunt integer eu Tincidunt integer eu",
//             "price": 888,
//             "img": "/img/170_200/golden_gate_bridge.jpg"
//         }, {
//             "id": 15,
//             "title": "Tincidunt integer eu Tincidunt integer eu",
//             "price": 888,
//             "img": "/img/170_200/horses.jpg"
//         }]
//     }
//     await ctx.render('index/category', {
//         title,
//         pageJs,
//         data
//     });
// }

// export async function detail(ctx, next) {
//     const title = '商品详情';
//     const pageJs = webpackIsomorphicTools.assets().javascript.detail;
//     const data = null
//     await ctx.render('index/detail', {
//         title,
//         pageJs,
//         data
//     });
// }

// export async function orderConfirm(ctx, next) {
//     const title = '订单确认';
//     const pageJs = webpackIsomorphicTools.assets().javascript.order;
//     const data = {
//         goods: [{
//             "id": 123,
//             "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
//             "sku": 'red',
//             "price": 25670,
//             "quantity": 1230
//         }, {
//             "id": 124,
//             "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
//             "sku": 'red',
//             "price": 25671,
//             "quantity": 1231
//         }, {
//             "id": 125,
//             "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
//             "sku": 'red',
//             "price": 25672,
//             "quantity": 1232
//         }],
//         addresses: [{
//             "id": 123,
//             "name": "Mi id sollicitudin",
//             "mobile": "15098765432",
//             "where": "山西-西安-莲湖区",
//             "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
//         }, {
//             "id": 124,
//             "name": "Mi jd sollicitudin",
//             "mobile": "15098765432",
//             "where": "山西-西安-莲区",
//             "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
//         }, {
//             "id": 125,
//             "name": "Mi kd sollicitudin",
//             "mobile": "15098765432",
//             "where": "山西-西安-湖区",
//             "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
//         }, ],
//         totalGoods: 1256,
//         deliveryFee: 100
//     }
//     await ctx.render('index/orderConfirm', {
//         title,
//         pageJs,
//         data
//     });
// }

// export async function orders(ctx, next) {
//     const title = '我的订单';
//     const pageJs = webpackIsomorphicTools.assets().javascript.order;
//     const data = {
//         orders: [{
//             "id": 123,
//             status: 1,
//             "total": 12556,
//             "dateOrder": "2016-06-25 12:25",
//             "datePay": "-"
//         }, {
//             "id": 124,
//             status: 2,
//             "total": 125,
//             "dateOrder": "2016-05-25 12:25",
//             "datePay": "2016-05-25 12:25"
//         }, {
//             "id": 125,
//             status: 3,
//             "total": 9,
//             "dateOrder": "2016-04-25 12:25",
//             "datePay": "2016-04-25 12:25"
//         }]
//     }
//     await ctx.render('index/orders', {
//         title,
//         pageJs,
//         data
//     });
// }

// export async function order(ctx, next) {
//     const title = '订单详情';
//     const pageJs = webpackIsomorphicTools.assets().javascript.order;
//     const data = {
//         goods: [{
//             "id": 123,
//             "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
//             "sku": 'red',
//             "price": 25670,
//             "quantity": 1230
//         }, {
//             "id": 124,
//             "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
//             "sku": 'red',
//             "price": 25671,
//             "quantity": 1231
//         }, {
//             "id": 125,
//             "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus",
//             "sku": 'red',
//             "price": 25672,
//             "quantity": 1232
//         }],
//         addresses: [{
//             "id": 123,
//             "name": "Mi id sollicitudin",
//             "mobile": "15098765432",
//             "where": "山西-西安-莲湖区",
//             "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
//         }, {
//             "id": 124,
//             "name": "Mi jd sollicitudin",
//             "mobile": "15098765432",
//             "where": "山西-西安-莲区",
//             "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
//         }, {
//             "id": 125,
//             "name": "Mi kd sollicitudin",
//             "mobile": "15098765432",
//             "where": "山西-西安-湖区",
//             "address": "Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"
//         }, ],
//         totalGoods: 1256,
//         deliveryFee: 100,
//         step: 1
//     }
//     await ctx.render('index/order', {
//         title,
//         pageJs,
//         data
//     });
// }