const { mdLinks } = require("../src/index.js");

describe('mdLinks', () => {
  it('Debería ser una función', () => {
    expect(typeof mdLinks).toBe('function');
    //console.log('FIX ME!');
  });

  it('Debería ser una función que retorna una promesa', () => {
    const pathFile = 'src/test.md';
    const result = mdLinks(pathFile);
    expect(result).toBeInstanceOf(Promise);
  });

  it('Debería rechazar con un error para una ruta inexistente', () => {
    const inexistantPath = 'src/queencard/test.md';
    expect(mdLinks(inexistantPath)).rejects.toThrowError('La ruta no existe');
  });

  it('Debería rechazar con un error para un archivo que no es Markdown/.md', () => {
    const pathFile = 'C:\Users\Sulca\DEV011-md-links\src\test.txt'
    expect(mdLinks(pathFile)).rejects.toThrowError('La ruta no es un archivo Markdown');
  });

  it('Debería resolver un arreglo con 2 links para un archivo .md con 2 links', () => {
    return mdLinks('src/test.md')
      .then((links) => {
        links.forEach((link) => {
          // Verifica que cada enlace tenga propiedades href, text y file
          expect(link).toHaveProperty('href');
          expect(link).toHaveProperty('text');
          expect(link).toHaveProperty('file');
          //console.log(link, 'dyegucy'); // trae:{ href: 'https://markdown.es/', text: 'Markdown', file: undefined } dyegucy
        });
      });
  });

});

// it('debería resolver con los enlaces del archivo Markdown correctamente (sin validación)', () => {
//   const filePath = 'test/test.md';
//   const expectedLinks = {
//     "links":
//       [{
//         'href': "https://markdown.es/",
//         'text': "Markdown",
//         'file': "test.md",
//       }],
//     "stats": { "total": 1, "unique": 1 }
//   }

//   return expect(mdLinks(filePath, false)).resolves.toEqual(expectedLinks);
// });

//   it('Debería resolver un arreglo con 2 links para un archivo .md con 2 links', () => {
//     return mdLinks('src/test.md')
//       .then((links) => {
//         links.forEach((link) => {
//           // Verifica que cada enlace tenga propiedades href, text y file
//           expect(link).toHaveProperty('href');
//           expect(link).toHaveProperty('text');
//           expect(link).toHaveProperty('file');
//           //console.log(link, 'dyegucy'); trae:{ href: 'https://markdown.es/', text: 'Markdown', file: undefined } dyegucy
//         });
//       });
//   });

//   it('se rechaza la promesa cuando la ruta del archivo es invalida', () => {
//     return expect(mdLinks('src/nonExistentFile.md')).rejects.toThrow('La ruta del archivo es incorrecta o no existe.');
//   });


