/**
 * Webpack 4 performance file
 * see https://webpack.js.org/performance/
 * see https://webpack.js.org/performance/dev-server/
 */

"use strict";

const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const proxyConf = require('../../proxy.conf');

const policies = require('./policies.json');

// const __dirname = (path => path.replace(/^([a-z]\:)/, c => c.toUpperCase()))(process.__dirname());

module.exports = (env) => {
  const distPath = path.resolve(__dirname, env === "release" ? "." : "../..", "dist");
  const frameworkPath = path.resolve(__dirname, env === "release" ? "../../framework" : "../..", "dist");
  return [{
    name: "App",

    mode: "none", //disable default behavior

    target: "web",

    context: path.resolve(__dirname, "src"),

    entry: {
      managedElementsApp: ["./pluginManagedElements.tsx"] 
    },

    devtool: env === "release" ? false : "source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    output: {
      path: distPath,
      filename: "[name].js",
      library: "managedElementsApp",
      libraryTarget: "umd2",
      chunkFilename: "[name].js"
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }, {
          loader: "ts-loader"
        }]
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }]
      },{
        //don't minify images
        test: /\.(png|gif|jpg|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10,
            name: './images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ],
      
    },

    optimization: {
      noEmitOnErrors: true,
      namedModules: env !== "release",
      minimize: env === "release",
      minimizer: env !== "release" ? [] : [new TerserPlugin({
        terserOptions: {
          warnings: false, // false, true, "verbose"
          compress: {
            drop_console: true,
            drop_debugger: true,
          }
        }
      })],
    },

    plugins: [
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, "../../framework/src"),
        manifest: require(path.resolve(frameworkPath, "vendor-manifest.json")),
        sourceType: "umd2"
      }),
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, "../../framework/src"),
        manifest: require(path.resolve(frameworkPath, "app-manifest.json")),
        sourceType: "umd2"
      }),
      ...(env === "release" ? [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: "'production'",
            VERSION: JSON.stringify(require("./package.json").version)
          }
        }),
      ] : [
          new webpack.DefinePlugin({
            "process.env": {
              NODE_ENV: "'development'",
              VERSION: JSON.stringify(require("./package.json").version)
            }
          }),
          new CopyWebpackPlugin([{
            from: 'index.html',
            to: distPath
          }]),
        ])
    ],

     watchOptions: {
       ignored: /node_modules/
     },

    devServer: {
      contentBase: frameworkPath,

      compress: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      host: "0.0.0.0",
      port: 3500,
      disableHostCheck: true,
      historyApiFallback: true,
      inline: true,
      hot: false,
      quiet: false,
      stats: {
        colors: true
      },
      before: function(app, server, compiler) {
        app.get('/oauth/policies',(_, res) => res.json(policies));
      },
      proxy: proxyConf,
    }
  }];
}
