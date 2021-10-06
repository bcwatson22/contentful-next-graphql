const withImages = require('next-images'); // eslint-disable-line

module.exports = withImages({
  images: {
    domains: [
      'source.unsplash.com'
    ]
  },
  // i18n: {
  //   locales: [
  //     'en',
  //     'es',
  //     'catchAll'
  //   ],
  //   defaultLocale: 'catchAll'
  // },
  trailingSlash: true
});
