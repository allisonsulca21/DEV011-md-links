const { mdLinks } = require('./index')

mdLinks('README.md')
  .then(res => console.log('correct path', res))
  .catch(err => console.log('incorrect path', err));
