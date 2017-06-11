var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    entry: ['./index.js'],
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/, 
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    externals: [nodeExternals()]
}