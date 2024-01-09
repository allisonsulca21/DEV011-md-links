// llamado de las funciones del archivo function + función general MDLinks
const { convertAbsolute,
  existingPath, 
  validateMdExtension, 
  readFile, 
  validateLinks, 
  validateFormatLink } = require("./function.js");

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const { validate, stats } = options || {};
    // const { validate, stats } = options;
    // verificar si existe la ruta
    if (existingPath(path)) {
      //convertir a ruta absoluta
      const convertedPath = convertAbsolute(path);
      console.log(convertedPath, '✔ La ruta fue convertida con éxito!');
      // validar si es un archivo md
      //console.log(validateMdExtension(path), 'convertido');
      if(validateMdExtension(path) === true){
        readFile(convertedPath, path)
        .then((fileRed) => {
          //console.log(fileRed, 'texto');
          // retorna un booleano
          const links = validateFormatLink(fileRed, path);
          //console.log(links); //content (object)
          // si se valida el formato
          if(validate) {
            // creamos un array de links para la validación
            const validatePromise = links.map(validateLinks);
            Promise.all(validatePromise)
            .then((validatedLinks) => {
              if(stats) {
                const totalLinks = validatedLinks.length; // to know total length of links (all)
                const uniqueLinks = new Set(validatedLinks.map(link => link.href)).size; // New array with uniquelinks (set remove duplicated arrays), (...convert SetObject into an array to be lengthed)
                const brokenLinks = validatedLinks.filter((link) => link.ok === 'fail').length;
                const statsResult = { 
                  total:totalLinks, 
                  unique:uniqueLinks, 
                  broken: brokenLinks 
                };
                // console.log(statsResult, 'validate'); indica (-- validate --stats)
                resolve(statsResult);
              } else {
                resolve(validatedLinks);
              }
            })
            .catch((err) => reject(err));
          } else {
          // resolve(fileRed)
            if(stats) {
              const totalLinks = links.length; // to know total length of links (all)
              const uniqueLinks = new Set(links.map(link => link.href)).size; // New array with uniquelinks (set remove duplicated arrays), (...convert SetObject into an array to be lengthed)
              const statsResult = { 
                total: totalLinks, 
                unique: uniqueLinks 
              };
              // console.log(statsResult, 'linkssss'); indica la cantidad de links unicos y total (includes --stats)
              resolve(statsResult);         
            }
          } 
        })
        .catch((err)=> reject(err))
      } else {
        reject(new Error('La ruta no es un archivo Markdown'));
      }
      
    } else {
      reject(new Error('La ruta no existe'));
    }
  })
  
}

module.exports = {
  mdLinks
};
