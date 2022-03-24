const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const { type } = require("os");
const isDev = process.env.NODE_ENV === "development";

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const isProd = !isDev;
const plugins = () => {
  const basePlugins = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src/assets"),
    //       to: (__dirname, "assets")
    //     }
    //   ]
    // }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== "production", // Disable during development
      pngquant: {
        quality: "95-100"
      }
    })
  ];
  if (isProd) {
    basePlugins.push(
      new ImageminPlugin({
        bail: false, // Ignore errors on corrupted images
        cache: true,
        imageminOptions: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svg",
              {
                plugins: [
                  {
                    removeViewBox: false
                  }
                ]
              }
            ]
          ]
        }
      })
    );
  }

  return basePlugins;
};
module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./js/main.ts",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "app"),
    assetModuleFilename: `./img/[name].[contenthash][ext]`
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "app"),
    open: true,
    compress: true,
    hot: true,
    port: 3000
  },
  optimization: {
    minimize: isDev ? false : true,
    minimizer: [new TerserWebpackPlugin()]
  },

  plugins: plugins(),

  devtool: isProd ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.[tj]s$/,
        use: `ts-loader`,
        exclude: /node_modules/
      },
      {
        test: /\.(?:ico|svg|gif|png|jpg|jpeg|mp3)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify")
    },
    extensions: [".ts", ".js"]
  }
};
