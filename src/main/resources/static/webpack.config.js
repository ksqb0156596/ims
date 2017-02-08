/**
 * Created by Administrator on 2016/3/7.
 */
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件
    plugins:[commonsPlugin,
        new webpack.DefinePlugin({ // <-- 减少 React 大小的关键
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
      new webpack.optimize.DedupePlugin(), //删除类似的重复代码
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      }), //最小化一切
      new webpack.optimize.AggressiveMergingPlugin()//合并块
    ],
    //页面入口
    entry:{
        main:'./react/router.js'
    },
    //出口
    output:{
        path:'./public/js',
        filename:'bundle.js'
    },
    //配置加载器,配置每个文件类型的处理方式，这里使用react的jsx
    module:{
        loaders:[

            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css/,
                loader: "style!css"
            },
            {
                test: /\.jpg/,
                loader: "file-loader?name=../images/[name].[ext]"
            },
            {
                test: /\.png/,
                loader: "file-loader?name=../images/[name].[ext]"
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10&minetype=image/svg+xml'
            }
        ]
    },
    resolve: {
        //查找module的话从这里开始查找
        root: './', //绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['', '.js', '.json', '.css'],
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            //AppStore : 'js/stores/AppStores.js',//后续直接 require('AppStore') 即可
        }
    },
    devServer: {
        historyApiFallback: true
    }


}