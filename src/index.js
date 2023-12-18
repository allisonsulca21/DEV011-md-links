// llamado de las funciones del archivo function
const { convertAbsolute, extentionFilePath, nameExt, readFile } = require("./function.js");
const fs = require('fs');

function mdLinks(path) {
  return new Promise((resolve, reject) => {
    // llamado de las funciones del archivo function.js
    const convertedPath = convertAbsolute(path); //convertir a ruta absoluta
    console.log(convertedPath, "convertedPath");
    // verificar si existe la ruta
    if (!fs.existsSync(convertedPath)) {
    reject('La ruta no es correctaaaaaa');
    }

    const extension = extentionFilePath(convertedPath);
    const extResult = nameExt(convertedPath);

    readFile(convertedPath)
    .then((res) => resolve(res))
    .catch((err)=> reject(err))
  })
}

module.exports = {
  mdLinks
};
