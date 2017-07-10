var webpack=require('webpack');
var path=require('path');
var htmlWebpackPlugin=require('html-webpack-plugin');
var clearPlugin=require('clean-webpack-plugin');
var extractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
	entry:{
		index:'./src/js/index.js',
		s:'./src/js/s.js',
		c:'./src/js/c.js',
		vendor:['./src/components/jquery-3.0.0.min.js','./src/components/bootstrap.min.js']
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name].bundle.js',
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:'/node_modules',
				include:'/src/',
				use:{
					loader:'babel-loader',
					options:{
						presets:['env']
					}
				}
			},
			{
		        test: /\.css$/,
		        use: extractTextPlugin.extract({
		          fallback: "style-loader",
		          use: "css-loader"
		        })
		    },
		    {
				test:/\.less$/,
				use: [	
						{
	                		loader: "style-loader" // creates style nodes from JS strings
			            }, 
			            {
			                loader: "css-loader" // translates CSS into CommonJS
			            },
			            {
			                loader: "postcss-loader" // translates CSS into CommonJS
			            },  
			            {
			                loader: "less-loader",
			            }
	            ]
			},
			{
				test:/\.html$/,
				use:[{
					loader:"html-loader"
				}]
			},
			{
				test:/\.tpl$/,
				use:[{
					loader:"ejs-loader"
				}]
			},
			{
				test:/\.(png|jpg|gif|svg)$/,
				use:[{
						loader:"file-loader",
						options:{
							name:"assets/[name]-[hash:5].[ext]"
						},
					}
				]
			}
			/*{
				test:/\.(png|jpg|gif|svg)$/,
				use:[{
					loader:"url-loader",
					options:{
						name:"assets/[name]-[hash:5].[ext]",
						limit:2000
					}
				},
				"image-webpack-loader"
				]
			}*/
		]
	},
	plugins:[
		new clearPlugin('dist'),
		new extractTextPlugin("[name].css"),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor',
			filename:'js/vendor.bundle.js',
			minChunks: Infinity
		}),
		new htmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			inject:'head',
			chunks:['index','vendor']
		}),
		new htmlWebpackPlugin({
			filename:'community.html',
			template:'community.html',
			inject:'head',
			chunks:['c','vendor']
		}),
		new htmlWebpackPlugin({
			filename:'service.html',
			template:'service.html',
			inject:'head',
			chunks:['s','vendor']
		}),
	]

}