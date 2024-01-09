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

// --------------- Get Extension File Path --------------- 
const getExtensionFilePath = (routeUser) => path.extname(routeUser);

const validateMdExtension = (routeUser) => {
  const validateExtentionFile = [".md", ".mkd", ".mdwn", ".mdown", ".mdtxt", ".mdtext", ".markdown", ".text"];
  const fileExtention = getExtensionFilePath(routeUser);

  return validateExtentionFile.includes(fileExtention) ? true : 'File inválido';
};

// --------------- Reading File --------------- 
const readFile = (routeUser) => {
  return new Promise((resolve, reject) => {
    fs.readFile(routeUser, 'utf-8', (err, data) => {
      if (err) {
        reject('Hubo un error en la lectura del archivo.')
      } else {
        const extractedLinks = extractLinks(data, routeUser);
        if(extractedLinks.length == 0){
          reject('En el archivo no se encontraron links')
        } else {
          resolve(extractedLinks);
        }
      }
    });
  });
};

// --------------- Find Links ---------------
const extractLinks = (data, ruta) => {
  // función para extraer enlaces
  const html = marked.parse(data);
  const dom = new JSDOM(html);
  const anchorEtqA = dom.window.document.querySelectorAll("a")
  linksArray = []; //almacenamos los enlaces extraídos

  anchorEtqA.forEach((anchor) => {
    // itera sobre los elementos
    linksArray.push({
      href: anchor.href,
      text: anchor.textContent,
      file: ruta,
    }) //agrega href del enlace al arreglo de objeto
  })
  //console.log(convertAbsolute('docs/03-milestone.md'));
  return linksArray; //devuelve el arreglo de enlaces
}

// --------------- Validar solo formato 'Link' ---------------

const validateFormatLink = (data, ruta) => {
  // console.log(ruta, 'ruta');
  const regex = /^https?:\/\/\S+$/;
  const links = [];

  data.forEach((link) => {
    if (regex.exec(link.href) !== null) {
      links.push({
        href: link.href,
        text: link.text,
        file: ruta,
      });
    }
  })
  return links;
}

// --------------- Validate Links ---------------
const validateLinks = (link) => {
  // console.log(link, 'kikiri');
    return axios.head(link.href)
      .then((response) => {
        link.status = response.status;
        link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
        return link;
      })
      .catch(() => {
        link.status = 404;
        link.ok = 'fail';
        return link;
  });
};

// --------------- Modules exported ---------------
module.exports = {
  isAbsolutePath,
  convertAbsolute,
  existingPath,
  getExtensionFilePath,
  validateMdExtension,
  readFile,
  validateFormatLink,
  validateLinks,
};
