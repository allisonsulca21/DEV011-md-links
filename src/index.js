// llamado de las funciones del archivo function + función general MDLinks
const { convertAbsolute,
  existingPath, 
  validateMdExtension, 
  readFile, 
  validateLinks, 
  validateFormatLink } = require("./function.js");


function mdLinks(path, validate) {
  return new Promise((resolve, reject) => {
    // verificar si existe la ruta
    if (existingPath(path)) {
      //convertir a ruta absoluta
      const convertedPath = convertAbsolute(path);
      // validar si es un archivo md
      if(validateMdExtension(path) === true){
        readFile(convertedPath, path)
        .then((fileRed) => {
          // retorna un booleano
          const links = validateFormatLink(fileRed, path);
          console.log(path, 'path');
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
