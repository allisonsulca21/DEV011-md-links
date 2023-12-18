// módulo de creación de funciones puras/pqueñas
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { JSDOM } = require('jsdom');

const isAbsolutePath = (route) => path.isAbsolute(route); //boolean
const convertAbsolute = (route) => (isAbsolutePath(route) ? route : path.resolve(route));
const existingPath = (route) => fs.existsSync(route);
const extentionFilePath = (route) => path.extname(route); // 

const nameExt = (route) => {
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

const extractLinks = (data) => {
    objectsArr = []
    const html = marked.parse(data)
    const dom = new JSDOM(html);
    const anchorEtqA = dom.window.document.querySelectorAll("a")
    //console.log(anchorEtqA.length);
    anchorEtqA.forEach((anchor) => {
        objectsArr.push(
        {
          href: anchor.href,
          text: anchor.textContent,
          file: '',
        }
      )
    })
    //console.log(convertAbsolute('docs/03-milestone.md'));
    return objectsArr
}

function validarLinks(arrayObjs) {
    const resultMap = arratObjs.map((obj)=>obj.algo)
    console.log(resultMap)
    // revisar el Promise.all
}

module.exports = {
    isAbsolutePath,
    convertAbsolute,
    existingPath,
    extentionFilePath,
    nameExt,
    readFile
};
