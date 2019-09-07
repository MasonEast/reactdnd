const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PAGES = require('./webpackConfig/pages.js').generateEntrise();
const PATHS = PAGES.paths;
const isDEV = process.env.NODE_ENV === 'development' ? true : false;
const resetAntdLessVars = require('./static/less/resetAntdLessVars.js');

const darkTheme = require('@ant-design/dark-theme');   //改变antd主题色
let COOKIE = {}
if (isDEV) {
  COOKIE = require('./webpackConfig/cookie.js');
} else {
  COOKIE = {};
}

// 是否清除root目录下的assets文件
const otherPlugins = !isDEV && process.env.CLEAN ? [
  new CleanWebpackPlugin(["assets"], {
    root: path.resolve(__dirname, "../../../../ecerp-static/")
  })
] : [];

// 开发环境下代码校验需要配置lintLoader
const lintLoader = isDEV ? [{
  test: /\.js$/,
  loader: 'eslint-loader',
  enforce: "pre",
  exclude: /(node_modules)|(static)|(webpackConfig)|(template)/,
}] : []

// 生产环境打包插件
const productPlugins = !isDEV ? [
  // 去除console.log等控制台打印信息
  new DropConsoleWebpackPlugin({
    drop_log: true,
    drop_info: true,
    drop_warn: false,
    drop_error: false,
    exclude: ['manifest'],
  })
] : [];

const copyWebpackPlugin = process.env.NODE_ENV === 'production' && !process.env.EntryName ? [
  // 将当前项目工程下的模板同步到原有ecerp-sass的webapp下面
  new CopyWebpackPlugin([
    {
      force: true,
      toType: 'file',
      from: path.resolve(__dirname, "./WEB-INF/decorators.xml"),
      to: path.resolve(__dirname, "../webapp/WEB-INF/decorators.xml"),
    }
  ]),
] : [];

const HASH = (!isDEV ? "[hash:5]" : "dev");
const CONTENTHASH = (!isDEV ? "[contenthash:5]" : "dev");
const CHUNKHASH = (!isDEV ? "[chunkhash:5]" : "dev");

module.exports = {
  entry: PAGES.entries,
  output: {
    path: path.resolve(__dirname, PATHS.path),//编译后生成文件所在的路径
    publicPath: PATHS.publicPath,//编译后文件内部url资源引用的公共路径
    filename: process.env.version + "[name]." + HASH + ".js",
    chunkFilename: process.env.version + "[name]." + CHUNKHASH + ".js"
  },
  resolve: {//解决引入本地自定义目录的第三方库
    alias: {
      assets: path.resolve(__dirname, 'assets'),
      // 针对babel7将corejs删掉增加的别名 当前dva-core使用的还是写死的未删corejs版本
      '@babel/runtime': '@babel/runtime-corejs2'
    },
    modules: [path.join(__dirname, "src"), path.join(__dirname, "node_modules")]
  },
  plugins: [
    ...copyWebpackPlugin,
    ...otherPlugins,
    ...PAGES.htmlPlugins,
    new MiniCssExtractPlugin({
      filename: process.env.version + "[name]." + CONTENTHASH + ".css",
    }),
    ...productPlugins,
    // new webpack.HotModuleReplacementPlugin(),//开启热更新
    new webpack.NamedModulesPlugin(),//当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedChunksPlugin((chunk) => {
      // 解决异步模块打包的问题
      if (chunk.name) {
        return chunk.name;
      }
      return chunk._buildHash;
    })
  ],
  optimization: {
    minimize: !isDEV,
    minimizer: !isDEV ? [
      new UglifyJsPlugin({
        // 开启多线程
        parallel: true,
        uglifyOptions: {
          compress: {
            // 去除 console
            drop_console: true,
            // 去除部分影响性能代码，如：1/0
            keep_infinity: true,
          },
          output: {
            // 去除注释
            comments: false,
            // 紧凑输出
            beautify: false
          }
        }
      })
    ] : [],
    runtimeChunk: {//公用运行入口
      name: process.env.projectName + "manifest"
    },
    splitChunks: {
      name: 'common/common',
      maxAsyncRequests: 2,
      chunks: 'all',
      // name: false,
      // minChunks: 100,
      cacheGroups: Object.assign(PAGES.vendor, {
        'style/css': {
          chunks: 'all',
          test: /\.(less)$/,
          minChunks: !process.env.EntryName ? 2 : 1,
          name: "style/css",
          reuseExistingChunk: true,
          enforce: true,
          priority: 8,
        },
        // "utilCommon": {
        //     name: "utilCommon",
        //     chunks: 'initial',
        //     minSize:0,
        //     minChunks:2,
        //     priority: 7
        // }
      }, PAGES.splitExtraChunks)
    }
  },
  module: {
    rules: [
      ...lintLoader,
      {
        include: /(js)/,
        test: /\.(js|ts)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: /(static)|(node_modules)|(WEB-INF)|(webpackConfig)|(template)/,
      },
      {
        include: /(node_modules)|(static)|(js)/,
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // minimize: !isDEV,
              importLoaders: 2,
              // sourceMap: isDEV
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [
                require('postcss-cssnext')()
              ]
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: darkTheme,
            }
          },

        ]
      },
      {
        include: /(node_modules)|(static)|(js)/,
        test: /\.(sc|sa)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ]
      },
      {
        include: /(assets)/,
        test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,//图片的处理
        use: [{
          loader: 'url-loader',
          options: Object.assign({
            limit: 200,//当图片小于这个值他会生成一个图片的url 如果是一个大于的他会生成一个base64的图片在js里展示
            name: "[name]." + HASH + ".[ext]",//name:'[path][name].[ext]
            publicPath: PATHS.imgPublicPath,
          }, !isDEV ? { outputPath: PATHS.imgOutputPath } : {})
        }],
        exclude: /node_modules/,
      },
      {
        include: /(WEB-INF)/,
        test: /\.(html)|(ftl)$/,
        use: ['html-withimg-loader', 'html-loader'],
        exclude: /node_modules/,
      },
    ]
  },
  devtool: !isDEV ? 'eval' : 'source-map', // source-map方便控制台源码调试
  devServer: {
    port: 8000,
    hot: true,
    contentBase: path.resolve(__dirname, "./"),
    publicPath: "/assets",
    stats: 'errors-only',// 只显示bundle中的错误
    // clientLogLevel: "error",
    noInfo: true,
    inline: true,// 实时刷新
    proxy: [{
      // context: PAGES.proxyContext,
      // target: '',
      // changeOrigin: true,
      // logLevel: 'debug',
      // headers: {
      //   'Cookie': COOKIE.cookie
      // }
    }]
  }
};


