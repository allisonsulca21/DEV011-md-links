// módulo de creación de funciones puras/pqueñas
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { JSDOM } = require('jsdom');
const axios = require ('axios');

const isAbsolutePath = (route) => path.isAbsolute(route); //boolean
const convertAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));
const existingPath = (route) => {
    return fs.existsSync(route);
  };
const extentionFilePath = (route) => path.extname(route); // 

const validateMdExtension = (route) => {
    const validateExtentionFile = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];
    const fileExtention = extentionFilePath(route);

    return validateExtentionFile.includes(fileExtention) ? true : 'Invalid File';
};

const readFile = (route) => {
  return new Promise ((resolve,reject) => {
    fs.readFile(route, 'utf-8', (err, data) => {
      if(err) reject('Hubo un error en la lectura del archivo.')
        // const dom = new JSDOM((marked.parse(data)));
      const extractedLinks = extractLinks(data)
      resolve(extractedLinks)
    //   console.log(extractedLinks, 'te encontré');
    })
  })
}

// axios.get('')
//   .then(response => console.log(response.data))
//   .catch(error => console.error(error))

const extractLinks = (data) => {
    objectsArr = []
    const html = marked.parse(data)
    const dom = new JSDOM(html);
    const anchorEtqA = dom.window.document.querySelectorAll("a")
    console.log(anchorEtqA.length);
    anchorEtqA.forEach((anchor) => {
        objectsArr.push(
        {
          href: anchor.href,
          text: anchor.textContent,
          file: '',
          stats: anchor.stats,
          ok: anchor.ok,
        }
      )
    })
    //console.log(convertAbsolute('docs/03-milestone.md'));
    return objectsArr
}

const validateLinksOld = (data) => {
    const checkArray = data.map((i) => {
        const newObj = { ...i };
        return axios
          .get((newObj.href)
          .then((res) => {
            newObj.status = res.status;
            newObj.msg = res.statusText;
            return newObj; //return el objeto ya modificado
            })
            .catch((error) => {
                newObj.status = !error.response ? 404 : error.response.status;
                newObj.msg = 'Fail';
                return newObj;
          }))
    })
    console.log(validateLinks, 'links?');

    return Promise.all(checkArray);
}

const validateLinks = (link) => {
    axios.get(link)
  .then(response => console.log(response.data))
  .catch(error => console.error(error))
}

module.exports = {
    isAbsolutePath,
    convertAbsolute,
    existingPath,
    extentionFilePath,
    validateMdExtension,
    readFile,
    validateLinks
};
