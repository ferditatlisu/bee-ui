const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: '/',
      };
      return webpackConfig;
    },
    alias: {
      '@apis': path.resolve(__dirname, 'src', 'apis'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@constants': path.resolve(__dirname, 'src', 'constants.js'),
      '@containers': path.resolve(__dirname, 'src', 'containers'),
      '@context': path.resolve(__dirname, 'src', 'context'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@i18n': path.resolve(__dirname, 'src', 'i18n'),
      '@iframes': path.resolve(__dirname, 'src', 'iframes'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@pagesStore': path.resolve(__dirname, 'src', 'pages', 'store'),
      '@store': path.resolve(__dirname, 'src', 'store'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
    },
  },
};
