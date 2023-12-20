// llamado de las funciones del archivo function
const { convertAbsolute, existingPath, validateMdExtension, readFile, validateLinks, validateFormatLink } = require("./function.js");
const fs = require('fs');

function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    // verificar si existe la ruta
    if (existingPath(path)) {
      //convertir a ruta absoluta
      const convertedPath = convertAbsolute(path);
      // console.log(convertedPath, "convertedPath");

      // validar si es un archivo md
      if(validateMdExtension(path) === true){
        readFile(convertedPath)
        .then((fileRed) => {
          // retorna un boolean
          const links = validateFormatLink(fileRed);
          
          if(validate) {
            validateLinks(links).then((res) => resolve(res));
          } else {
          resolve(fileRed)
          }
        })
        .catch((err)=> reject(err))
      } else {
        console.log('La ruta no es valida')
      }
      

    } else {
      console.log('La ruta no existe')
    }
  })
  
}

module.exports = {
  mdLinks
};
