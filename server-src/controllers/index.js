import User from '../models/user';

export default async (ctx, next) => {
  const title = '首页';
  const bodyclass = 'saasIndex'

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

  console.log(pageJs);

  await ctx.render('index/index', {
    title, bodyclass, pageJs
  })
}

export async function category(ctx, next) {
   const title = '类别';


   await ctx.render('index/category', {
    title 
  });
}
