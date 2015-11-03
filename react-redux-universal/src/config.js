require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT,
  app: {
    title: 'React Redux Example',
    description: 'ES6/7 Templates with React',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'ES6 Templates',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'ES6 Templates',
        'og:description': 'ES6/7 Templates with React'
      }
    }
  }
}, environment);
