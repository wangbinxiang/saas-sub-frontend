import User from '../models/user';

export default async (ctx, next) => {
  const title = '首页';

  // if (ctx.isAuthenticated()) {
  //   ctx.redirect('/products');
  // }


  // const requestJsonApi = new RequestJsonApi('https://api.github.com');


  // const user = new User();

  // const { res, body } = await user.get('/');

  // const { res, body } = await requestJsonApi.get('/');
  //console.log(res);
  //console.log(body);
  // ctx.cookies.set('test2', 'value2');

  // if (ctx.isAuthenticated()) {
  //   console.log('isAuthenticated');
  //   ctx.logout();
  // }

  const pageJs = webpackIsomorphicTools.assets().javascript.index;

  const data = {"ads": [
        {
            "id":4563,
            "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg",
            "title": "Sapien elit in malesuada semper mi id sollicitudin urna fermentum",
            "price": 15678
        },
        {
            "id":4564,
            "img": "/img/170_200/horses.jpg",
            "title": "Sapien elit in malesuada semper mi id sollicitudin urna fermentum  malesuada semper mi id sollicitudin urna fermentum",
            "price": 15679
        },
        {
            "id":4565,
            "img": "/img/170_200/78faf2d5-173a-4381-a452-8ee49d2b44fd.jpg",
            "title": "Sapien elit in malesuada",
            "price": 15680
        },
        {
            "id":4566,
            "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg",
            "title": "Sapien elit in malesuada semper mi id sollicitudin urna fermentum malesuada semper mi id sollicitudin urna fermentum",
            "price": 15681
        },
        {
            "id":4567,
            "img": "/img/170_200/81971615-b39a-4e76-8eb2-7968f7568219.jpg",
            "title": "Sapien elit in malesuada semper mi id sollicitudin urna fermentum",
            "price": 15682
        }
      ],
      "lbs":[
            {"id": 123, "lb": "国内游"},
            {"id": 124, "lb": "儿童游"},
            {"id": 125, "lb": "干果"}
      ],
      "hots":[{
          "id":625,
          "cata": "我的商品",
          "total":25,
          "items":[
                {"id":10, "title":"Tincidunt integer eu", "price": 15783, "img": "/img/list/2e788ac5e180bb9ffd10fbaa3e728b57a9cd6dd2.png"},
                {"id":11, "title":"Tincidunt integer eu integer eu integer eu", "price": 15784, "img": "/img/list/burberry_children_01.png"},
                {"id":12, "title":"Tincidunt integer eu", "price": 15785, "img": "/img/list/burberry_children_02.png"},
                {"id":13, "title":"Tincidunt integer eu integer eu", "price": 15786, "img": "/img/list/burberry_children_05.png"},
                {"id":14, "title":"Tincidunt integer eu", "price": 15787, "img": "/img/list/glimpese_img0_v2_m56577569830605808[1].jpg"},
                {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/list/w_catalog_v2_m56577569831969314.jpg"},
          ]
      },
      {
          "id":626,
          "cata": "线路",
          "total":26,
          "items":[
                {"id":10, "title":"Tincidunt integer eu", "price": 15783, "img": "/img/list/2e788ac5e180bb9ffd10fbaa3e728b57a9cd6dd2.png"},
                {"id":11, "title":"Tincidunt integer eu integer eu integer eu", "price": 15784, "img": "/img/list/burberry_children_01.png"},
                {"id":12, "title":"Tincidunt integer eu", "price": 15785, "img": "/img/list/burberry_children_02.png"},
                {"id":13, "title":"Tincidunt integer eu integer eu", "price": 15786, "img": "/img/list/burberry_children_05.png"},
                {"id":14, "title":"Tincidunt integer eu", "price": 15787, "img": "/img/list/glimpese_img0_v2_m56577569830605808[1].jpg"},
                {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/list/w_catalog_v2_m56577569831969314.jpg"},
          ]
      },
      {
          "id":627,
          "cata": "食品",
          "total":27,
          "items":[
                {"id":10, "title":"Tincidunt integer eu", "price": 15783, "img": "/img/list/2e788ac5e180bb9ffd10fbaa3e728b57a9cd6dd2.png"},
                {"id":11, "title":"Tincidunt integer eu integer eu integer eu", "price": 15784, "img": "/img/list/burberry_children_01.png"},
                {"id":12, "title":"Tincidunt integer eu", "price": 15785, "img": "/img/list/burberry_children_02.png"},
                {"id":13, "title":"Tincidunt integer eu integer eu", "price": 15786, "img": "/img/list/burberry_children_05.png"},
                {"id":14, "title":"Tincidunt integer eu", "price": 15787, "img": "/img/list/glimpese_img0_v2_m56577569830605808[1].jpg"},
                {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/list/w_catalog_v2_m56577569831969314.jpg"},
          ]
      }]
  }
  await ctx.render('index/index', {
    title, pageJs, data
  })
}

export async function category(ctx, next) {
    const title = '类别';
    const pageJs = webpackIsomorphicTools.assets().javascript.cata;
    const data = {
        "lbs":[
              {"id": 123, "lb": "London"},
              {"id": 124, "lb": "美食"},
              {"id": 123, "lb": "独立成团"},
              {"id": 124, "lb": "酒店"},
              {"id": 123, "lb": "邮轮"},
              {"id": 124, "lb": "购物"},
              {"id": 123, "lb": "ChongQing"},
              {"id": 124, "lb": "HangZhou"},
              {"id": 125, "lb": "QingDao"}
        ],
        "items":[{"id":10, "title":"Tincidunt integer eu", "price": 15783, "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"},
                  {"id":11, "title":"Tincidunt integer eu integer eu integer eu", "price": 15784, "img": "/img/170_200/150711-n-ru971-772.jpg"},
                  {"id":12, "title":"Tincidunt integer eu", "price": 15785, "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"},
                  {"id":13, "title":"Tincidunt integer eu integer eu", "price": 15786, "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg"},
                  {"id":14, "title":"Tincidunt integer eu", "price": 15787, "img": "/img/170_200/city_skyline.jpeg"},
                  {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/170_200/fcfa8905-7145-4b81-acad-255c13ae0221.jpg"},
                  {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/170_200/golden_gate_bridge.jpg"},
                  {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/170_200/horses.jpg"},
                  {"id":10, "title":"Tincidunt integer eu", "price": 15783, "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"},
                  {"id":11, "title":"Tincidunt integer eu integer eu integer eu", "price": 15784, "img": "/img/170_200/150711-n-ru971-772.jpg"},
                  {"id":12, "title":"Tincidunt integer eu", "price": 15785, "img": "/img/170_200/60dd7658-702b-4787-bc09-4c3a33bf831b.jpg"},
                  {"id":13, "title":"Tincidunt integer eu integer eu", "price": 15786, "img": "/img/170_200/ecba5dd0-b6fb-406e-9b6e-08f7fc8ec60d.jpg"},
                  {"id":14, "title":"Tincidunt integer eu", "price": 15787, "img": "/img/170_200/city_skyline.jpeg"},
                  {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/170_200/fcfa8905-7145-4b81-acad-255c13ae0221.jpg"},
                  {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/170_200/golden_gate_bridge.jpg"},
                  {"id":15, "title":"Tincidunt integer eu Tincidunt integer eu", "price": 888, "img": "/img/170_200/horses.jpg"}
        ]
    }
   await ctx.render('index/category', {
       title, pageJs, data 
  });
}

export async function detail(ctx, next) {
    const title = '商品详情';
    const pageJs = webpackIsomorphicTools.assets().javascript.detail;
    const data = null
    await ctx.render('index/detail', {
        title, pageJs, data 
    });
}

export async function orderConfirm(ctx, next) {
    const title = '订单确认';
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    const data = {goods:[
            {"id": 123, "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus", "sku":'red', "price":25670, "quantity": 1230},
            {"id": 124, "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus", "sku":'red', "price":25671, "quantity": 1231},
            {"id": 125, "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus", "sku":'red', "price":25672, "quantity": 1232}
    ],
        addresses:[
        {"id": 123, "name": "Mi id sollicitudin", "mobile":"15098765432", "where": "山西-西安-莲湖区", "address":"Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"},
        {"id": 124, "name": "Mi jd sollicitudin", "mobile":"15098765432", "where": "山西-西安-莲区", "address":"Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"},
        {"id": 125, "name": "Mi kd sollicitudin", "mobile":"15098765432", "where": "山西-西安-湖区", "address":"Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"},
        ],
        totalGoods:1256, deliveryFee:100
    }
    await ctx.render('index/orderConfirm', {
        title, pageJs, data 
    });
}

export async function orders(ctx, next) {
    const title = '我的订单';
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    const data = {orders:[
        {"id": 123, status: 1, "total": 12556, "dateOrder": "2016-06-25 12:25", "datePay": "-"},
        {"id": 124, status: 2, "total": 125, "dateOrder": "2016-05-25 12:25", "datePay": "2016-05-25 12:25"},
        {"id": 125, status: 3, "total": 9, "dateOrder": "2016-04-25 12:25", "datePay": "2016-04-25 12:25"}
    ]        
    }
    await ctx.render('index/orders', {
        title, pageJs, data 
    });
}

export async function order(ctx, next) {
    const title = '订单详情';
    const pageJs = webpackIsomorphicTools.assets().javascript.order;
    const data = {goods:[
            {"id": 123, "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus", "sku":'red', "price":25670, "quantity": 1230},
            {"id": 124, "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus", "sku":'red', "price":25671, "quantity": 1231},
            {"id": 125, "name": "Mi, id sollicitudin urna fermentum ut fusce varius nisl ac ipsum gravida vel pretium tellus", "sku":'red', "price":25672, "quantity": 1232}
    ],
        addresses:[
        {"id": 123, "name": "Mi id sollicitudin", "mobile":"15098765432", "where": "山西-西安-莲湖区", "address":"Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"},
        {"id": 124, "name": "Mi jd sollicitudin", "mobile":"15098765432", "where": "山西-西安-莲区", "address":"Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"},
        {"id": 125, "name": "Mi kd sollicitudin", "mobile":"15098765432", "where": "山西-西安-湖区", "address":"Sapien elit in malesuada semper mi, id sollicitudin urna fermentum"},
        ],
        totalGoods:1256, deliveryFee:100, step:1
    }
    await ctx.render('index/order', {
        title, pageJs, data 
    });
}
