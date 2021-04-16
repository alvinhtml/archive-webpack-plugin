//webpack

const path = require('path');
const webpack = require('webpack'); // webpack 插件
const TerserPlugin = require("terser-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || '/';


const config = {
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },

  // 两种模式， production (生产模式) development（开发模式）
  mode: process.env.NODE_ENV,

  target: 'node',

  entry: {
    index: './app/scripts/index.js'
  },

  output: {
    filename: '[name].js', // 打包后的文件名
    path: path.resolve(__dirname, './dist'), // 路径必须是绝对路径
    library: {
      type: 'commonjs2',
      export: ['default'],
    },

  },

  resolve: {
    modules: ['node_modules'],
    alias: {
      '~': path.resolve(__dirname, './app/scripts/')
    },
    extensions: ['.js'], // 配置省略后缀名
    fallback: {
      // path: require.resolve("path-browserify"),
      // constants: require.resolve("constants-browserify"),
      // assert: require.resolve("assert/"),
      // os: require.resolve("os-browserify/browser"),
      // fs: false
    }
  },

  module: { // 模块

    rules: [ // 规则
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除
        use: {
          loader: 'babel-loader',
          options: { // 用 babel-loader 转化 ES6-ES5
            presets: [ // 这里是大插件集合
              '@babel/preset-env'
            ],
            plugins: [ // 这里可以配置一些小的插件
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-regenerator'
            ]
          }
        }
      }
    ]
  },
};
const plugins = [ // 数组，放着所有 webpack 插件
  new webpack.DefinePlugin({
    'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
  })
]

if (process.env.NODE_ENV !== 'production') {
  // 源码映射，生成一个映射文件，帮我们定位源码文件
  config.devtool = 'source-map';
}

config.plugins = plugins;
module.exports = config;
