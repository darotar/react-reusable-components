const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const paths = require('../config/paths');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);

    config.module.rules[4].exclude = /\.m\.svg$/;
    config.module.rules.push({
      test: /\.scss$/,
      include: paths.appSrc,
      loaders: ["style-loader", "css-loader", "sass-loader"]
    });

    config.module.rules.push({
        test: /\.m\.svg$/,
        loader: require.resolve('svg-sprite-loader'),
        options: {
            symbolId: '[name]__[hash]'
        }
    });

    return config;
};