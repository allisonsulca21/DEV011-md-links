// módulo de creación de funciones puras/pqueñas
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { JSDOM } = require('jsdom');
const axios = require('axios');

// --------------- Absolute Path --------------- 
const isAbsolutePath = (routeUser) => path.isAbsolute(routeUser); //boolean

// --------------- If not Absolute Path: convert to --------------- 
const convertAbsolute = (routeUser) => (isAbsolutePath(routeUser) ? routeUser : path.resolve(routeUser));

// --------------- Path exists --------------- 
const existingPath = (routeUser) => {
  return fs.existsSync(routeUser);
};

// --------------- Validate MD Extension --------------- 
const extentionFilePath = (routeUser) => path.extname(routeUser);

const validateMdExtension = (routeUser) => {
  const validateExtentionFile = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];
  const fileExtention = extentionFilePath(routeUser);

  return validateExtentionFile.includes(fileExtention) ? true : 'File inválido';
};

// --------------- Reading File --------------- 
const readFile = (routeUser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(routeUser, 'utf-8', (err, data) => {
      if (err) reject('Hubo un error en la lectura del archivo.')
      const extractedLinks = extractLinks(data)
      resolve(extractedLinks)
    })
  })
}

// --------------- Find Links ---------------
const extractLinks = (data, routeUser) => {
  // función para extraer enlaces
  const html = marked.parse(data);
  const dom = new JSDOM(html);
  const anchorEtqA = dom.window.document.querySelectorAll("a")
  objectsArr = []; //almacenamos los enlaces extraídos

  anchorEtqA.forEach((anchor) => {
    // itera sobre los elementos
    objectsArr.push({
      href: anchor.href,
      text: anchor.textContent,
      file: routeUser,
    }) //agrega href del enlace al arreglo de objeto
  })
  //console.log(convertAbsolute('docs/03-milestone.md'));
  return objectsArr; //devuelve el arreglo de enlaces
}

// --------------- Validar solo formato 'Link' ---------------
const validateFormatLink = (data) => {
  const regex = /^https?:\/\/\S+$/;
  const links = [];

  data.forEach((link) => {
    if (regex.exec(link.href) !== null) {
      links.push(link);
    }
  })
  return links;
}

// --------------- Validate Links ---------------
const validateLinks = (links) => {
  const verifArray = links.map((file) => {
    return axios
      .get(file.href)
      .then((result) => {
        return {
          ...file,
          status: result.status,
          statusText: result.statusText,
        };
      })
      .catch((error) => {
        return { 
          ...file, 
          status: error.status, 
          statusText: error.statusText 
        };
      });
  });
  return Promise.all(verifArray);
}

// // --------------- Validate Links ---------------
// const validateLinks = (links) => {
//     const verifArray = links.map((file) => {
//       const newItem = {...file};
//       return axios.get(newItem.href)
//       .then((res) => {
//         newItem.status = res.status;
//         newItem.statusText = res.statusText;
//         return newItem;
//       })
//       .catch((error) => {
//         newItem.status = !error.response ? 404 : error.response.status;
//         newItem.statusText = "error";
//         return newItem;
//         });
//     });
//     return Promise.all(verifArray);
// }


// --------------- Modules exported ---------------
module.exports = {
  isAbsolutePath,
  convertAbsolute,
  existingPath,
  extentionFilePath,
  validateMdExtension,
  readFile,
  validateFormatLink,
  validateLinks,

};
