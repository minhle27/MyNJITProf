const path = require("path");

const config = () => {
  return {
    entry: {
      background: "./background.js",
      content: "./src/content.js",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    target: "web",
    mode: "development",
    devtool: "cheap-module-source-map",
  };
};

module.exports = config;
