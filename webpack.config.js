const path = require('path');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let mode = "development";
if (process.env.NODE_ENV === "production") {
    mode = "production";
};

module.exports = {
    mode: mode,

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]",
    },

    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader,
                        options: {
                            publicPath: ""
                        }
                    },
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],

    devtool: "source-map",

    devServer: {
        contentBase: "./dist",
        hot: true,
    }
};