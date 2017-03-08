//将es6文件转义成es5代码文件，在docker环境下不会产生cpu高负载，且热更新文件较快
require('babel-polyfill');
require('colors');
const path = require('path');
const fs = require('fs');
const debug = require('debug')('dev');
const babelCliDir = require('babel-cli/lib/babel/dir')
const babelCliFile = require('babel-cli/lib/babel/file')
const chokidar = require('chokidar')


global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';



const projectRootPath = path.resolve(__dirname, '..');
const srcPath = path.join(projectRootPath, 'server-src');
const appPath = path.join(projectRootPath, 'server');
const log = console.log.bind(console, '> [DEV]:'.red)

const watcher = chokidar.watch(path.join(__dirname, '../server-src'))

const project_base_path = path.resolve(__dirname, '..');

watcher.on('ready', function() {
	log('Compiling...'.green)
	babelCliDir({
			outDir: 'server/',
			retainLines: true,
			sourceMaps: true
		}, ['server-src/']) // compile all when start
	const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
	global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack-isomorphic-tools')).server(projectRootPath, () => {
    	//server方法检测webpack-assets.json存在后才执行callback，app.js里加载了devMiddleware中间件会生成webpack-assets.json
     	// require(path.join(__dirname, '../server-src'))
    });
	log('App Starting'.green)
	require(path.join(__dirname, '../server')) // start app
	log('App Started'.green)

	watcher.on('add', function(absPath) {
		compileFile('server-src/', 'server/', path.relative(srcPath, absPath), cacheClean);
	}).on('change', function(absPath) {
		compileFile('server-src/', 'server/', path.relative(srcPath, absPath), cacheClean);
	}).on('unlink', function(absPath) {
		const rmfileRelative = path.relative(srcPath, absPath);
		const rmfile = path.join(appPath, rmfileRelative);
		try {
			fs.unlinkSync(rmfile);
			fs.unlinkSync(rmfile + '.map');
		} catch (e) {
			debug('fail to unlink', rmfile);
			return;
		}
		console.log('> Deleted', rmfileRelative);
		cacheClean();
	});
})



function compileFile(srcDir, outDir, filename, cb) {
	const outFile = path.join(outDir, filename)
	const srcFile = path.join(srcDir, filename)
	try {
		babelCliFile({
			outFile: outFile,
			retainLines: true,
			highlightCode: true,
			comments: true,
			babelrc: true,
			sourceMaps: true
		}, [srcFile], {
			highlightCode: true,
			comments: true,
			babelrc: true,
			ignore: [],
			sourceMaps: true
		})
	} catch (e) {
		console.error('> Error while compiling file %s', filename, e)
		return
	}
	console.log('>' + srcFile + ' -> ' + outFile)
	cb && cb()
}

function cacheClean() {
	Object.keys(require.cache).forEach(function(id) {
		if (/[\/\\](server)[\/\\]/.test(id)) {
			delete require.cache[id]
		}
	})
	// const filePath = path.join(appPath, '../' + outFile)
	// console.log(filePath);
	// const module = require.cache[filePath];
	// console.log(module);
 //    // remove reference in module.parent
 //    if (module && module.parent) {
 //    	console.log(module.parent.children);
 //        module.parent.children.splice(module.parent.children.indexOf(module), 1);
 //    }
 //    delete require.cache[filePath];
	log('App Cache Cleaned...'.green)
}

process.on('exit', function(e) {
	log('App Quit'.green)
})