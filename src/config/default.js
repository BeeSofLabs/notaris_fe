/* @flow */

export default {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT || '8080',
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Notaris',
    titleTemplate: 'Notaris - %s',
    meta: [
      {
        name: 'description',
        content: 'Notaris.'
      }
    ]
  }
};
