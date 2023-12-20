// módulo de creación de funciones puras/pqueñas
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const { JSDOM } = require('jsdom');
const  axios  = require('axios');


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

const validateFormatLink = (data) => {
    const regex = /^https?:\/\/\S+$/;;
    const links = [];
   

    data.forEach((link) => {
      if (regex.exec(link.href)  !== null) {
            links.push(link);
        } 
    })
    return links;
}
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
                }
              )
        
       
    })
    //console.log(convertAbsolute('docs/03-milestone.md'));
    return objectsArr
}

// const validateLinks = (data) => {
   
//     const checkArray = data.map((i) => {
//         const newObj = {...i};
//         return axios.get(newObj.href)
//           .then((res) => {
//             newObj.status = res.status;
//             newObj.statusText = res.statusText;
//             return newObj; 
//           })
//           .catch((error) => {
//                 newObj.status = !error.response ? 404 : error.response.status;
//                 newObj.statusText = 'Fail';
//                 return newObj;
//           });
//     });
//     return Promise.all(checkArray);
// }

const validateLinks = (links) => {
    const verifArray = links.map((i) => {
      const newItem = {...i};
      return axios.get(newItem.href)
      .then((res) => {
        newItem.status = res.status;
        newItem.statusText = res.statusText;
        return newItem;
      })
      .catch((error) => {
        newItem.status = !error.response ? 404 : error.response.status;
        newItem.statusText = "error";
        return newItem;
        });
    });
    return Promise.all(verifArray);
  }

module.exports = {
    isAbsolutePath,
    convertAbsolute,
    existingPath,
    extentionFilePath,
    validateMdExtension,
    readFile,
    validateFormatLink,
    validateLinks
};
