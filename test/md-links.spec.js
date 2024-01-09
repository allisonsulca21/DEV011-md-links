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
    const inexistentPath = 'src/queencard/test.md';
    expect(mdLinks(inexistentPath)).rejects.toThrowError('La ruta no existe');
  });

  it('Debería rechazar con un error para un archivo que no es Markdown/.md', () => {
    const nonMdFile = 'src/test.txt'
    return expect(mdLinks(nonMdFile)).rejects.toThrowError('La ruta no existe');
  });

  it('Debería resolver con los enlaces extraídos si la lectura del archivo es exitosa', () => {
    const validPath = 'src/test.md';
    const options = { validate: true, stats: false };

    return mdLinks(validPath, options).then((result) => {
      expect(result).toEqual([
        {
          file: 'src/test.md',
          href: 'https://markdown.es/',
          ok: 'ok',
          status: 200,
          text: 'Markdown',
        },
        {
          file: 'src/test.md',
          href: 'https://coda.io/d/Book-Estudiantes-DEV011_dAMz9-r-D3L/Proyectos_su0yk#_luGLw',
          ok: 'ok',
          status: 200,
          text: 'Coda Estudiantes',
        },
        {
          file: 'src/test.md',
          href: 'https://www.instagram.com/',
          ok: 'ok',
          status: 200,
          text: 'Instagram',
        },
      ]);
    });
  });
  it('Debería resolver con estadísticas si se especifica la opción "stats"', () => {
    const validPath = 'src/test.md';
    const options = { validate: true, stats: true };

    return mdLinks(validPath, options).then((result) => {
      // Verificar la estructura del resultado según tus expectativas
      expect(result).toEqual(
        {
          broken: 0,
          total: 3,
          unique: 3,
        }
      );
    });
  });

});

// it('se rechaza la promesa cuando la ruta del archivo es invalida', () => {
//   return expect(mdLinks('src/nonExistentFile.md')).rejects.toThrow('La ruta no existe');
// });
