const withImages = require('next-images'); // eslint-disable-line
const withBundleAnalyzer = require('@next/bundle-analyzer')({ // eslint-disable-line 
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withImages(
  withBundleAnalyzer({
    images: {
      domains: [
        'source.unsplash.com'
      ]
    },
    i18n: {
      locales: [
        'en',
        'es',
        'catchAll'
      ],
      defaultLocale: 'catchAll'
    },
    trailingSlash: true
  })
);
