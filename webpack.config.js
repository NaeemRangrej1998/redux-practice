const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    let isDevelopment = true;
    let envFile = 'dev';
    if (env.qa || env.uat || env.prod) {
        isDevelopment = false;
        envFile = env.prod ? 'prod' : env.qa ? 'qa' : 'uat';
    }
    console.log("isDevelopment" + ":" + envFile + " " + "isDevelopment:" +isDevelopment)
    return {
        entry: './src/index.js',  // Entry point
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, "dist"),
        },
        mode: argv.mode,
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,   // For JS and JSX files
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
                {
                    test: /\.css$/,  // For CSS files
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.scss$/, // For SCSS files
                    use: [
                        MiniCssExtractPlugin.loader, // Extracts CSS into separate files
                        "css-loader",   // Translates CSS into CommonJS
                        "sass-loader"   // Compiles Sass to CSS
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,  // Image assets
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,  // Font assets
                    type: 'asset/resource'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html", // ✅ Ensure the correct path
                filename: "index.html",
                inject: "body",
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new Dotenv({
                path: path.resolve(__dirname, `env/.env.${envFile}`), // ✅ Ensures correct path
            })
        ],
        devServer: {
            historyApiFallback: true,
            static: {
                directory: path.resolve(__dirname, 'dist'),
            },
            compress: true,
            port: 3000,
            hot: true,
            open: true,  // ✅ Automatically open the browser
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        }
    }
};
