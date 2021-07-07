const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction ? MiniCSSExtractPlugin.loader : "style-loader";

const config = {
  entry: "./src/top-page/top-page.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/top-page/top-page.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/i,
        use: [
          'html-loader',
        ]
      },
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      //   // type: "asset",
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'assets/images/'
      //       }
      //     }
      //   ]
      // },
    ],
  }
};


module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(
      // new WorkboxWebpackPlugin.GenerateSW(),
      new MiniCSSExtractPlugin({ filename: '[contenthash].css' })
    );
  } else {
    config.mode = "development";
  }
  return config;
};
