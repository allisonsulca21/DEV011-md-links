const { mdLinks } = require('./index')
const process = require('process')


// mdLinks('C:/Users/Sulca/DEV011-md-links/docs/04-milestone.md')

const linksValidated = process.argv.includes("--validate")
const ruta = process.argv[2]

// console.log( linksValidated,ruta, '2563')
// const linksValidated = process.argv.includes("--validate")
mdLinks(ruta, linksValidated)
   .then(res => console.log('correct result', res))
   .catch(err => console.log('incorrect result', err));

// mdLinks(ruta)
//   .then(links => {
//     res => [{ href, text, file }, links, res]
//   })
//   .catch(console.error);


