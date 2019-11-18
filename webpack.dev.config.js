const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    entry: {
        main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],
        'OneSignalSDKUpdaterWorker': path.resolve('./src/OneSignalSDKUpdaterWorker.js'),
        'OneSignalSDKWorker': path.resolve('./src/OneSignalSDKWorker.js')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    },
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.html$/, use: [{ loader: "html-loader" }] },
            { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            excludeChunks: ['server'],
            favicon: "./src/favicon.ico"
        }),
        new WorkboxPlugin.GenerateSW({
          clientsClaim: true,
          skipWaiting: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new WebpackPwaManifest({
          name: 'App Name',
          short_name: 'App short Name',
          description: 'Your Description Here',
          start_url: '/',
          background_color: '#ffffff',
          theme_color: '#ffffff',
          crossorigin: 'anonymous', //cant be null, use-credentials or anonymous
          icons: [
            {
              src: path.resolve('./src/assets/images/logo.png'),
              sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
            },
            {
              src: path.resolve('./src/assets/images/large-icon.png'),
              size: '1024x1024' // you can also use the specifications pattern
            }
          ]
        })
    ]
};