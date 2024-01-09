jest.mock('', () => jest.fn());

const {
    convertAbsolute,
    existingPath,
    getExtensionFilePath,
    validateMdExtension,
    readFile,
} = require('./src/function')

// Test 1
describe('convertedPath', () => {
    const pathR = 'docs/02-milestone.md';
    // const pathA = 'C:/Users/Sulca/DEV011-md-links/docs/02-milestone.md';
    const pathA = 'C:\\Users\\Sulca\\DEV011-md-links\\docs\\02-milestone.md';

    it('debería convertir una ruta relativa a absoluta', () => {
        expect(convertAbsolute(pathR)).toBe(pathA);
    })
})

// Test 2
describe('existingPath', () => {
    const pathExistent = 'C:\\Users\\Sulca\\DEV011-md-links\\docs\\02-milestone.md';
    const pathNotExistent = 'C:\\Users\\Sulca\\DEV011-md-links\\docs\\02-milest.m';
    it('Verifica si la ruta existe o no', () => {
        expect(existingPath(pathExistent)).toBe(true);
        expect(existingPath(pathNotExistent)).toBe(false);
    });
})

// Test 3
describe('nameExt', () => {
    const pathAbsolute = 'C:/Users/Sulca/DEV011-md-links/docs/03-milestone.md';
    const pathRelative = '';
    it('Verifica si la ruta es un archivo .md o no', () => {
        // Comprobamos la extensión usando getExtensionFilePath
        expect(getExtensionFilePath(pathAbsolute)).toBe('.md');
        expect(getExtensionFilePath(pathRelative)).not.toBe('.md');

        // Comprobamos la validación usando validateMdExtension
        expect(validateMdExtension(pathAbsolute)).toBe(true);
        expect(validateMdExtension(pathRelative)).toBe('File inválido');
    });
})

// Test 4
describe('readFile', () => {
  const validPath = './src/test.md';

  it('debería resolver con los enlaces extraídos si la lectura del archivo es exitosa', () => {
    return readFile(validPath).then((result) => {
        // Mapeamos el resultado para quitar las propiedades que no son relevantes para la prueba
        const resultWithoutStatus = result.map(({ file, href, text }) => ({ file, href, text }));
  
        // Verificamos que el resultado sea el esperado
        expect(resultWithoutStatus).toEqual([
          { href: 'https://markdown.es/', text: 'Markdown', file: './src/test.md' },
          { href: 'https://coda.io/d/Book-Estudiantes-DEV011_dAMz9-r-D3L/Proyectos_su0yk#_luGLw', text: 'Coda Estudiantes', file: './src/test.md' },
          { href: 'https://www.instagram.com/', text: 'Instagram', file: './src/test.md' },
        ]);
      });
    });

  it('debería rechazar con un mensaje de error si la lectura del archivo falla', () => {
    // Asegúrate de que el archivo no exista o tenga contenido incorrecto para simular un error
    const invalidPath = './src/invalid-file.md';

    // Ejecuta la función que estás probando y verifica que rechace con el mensaje de error esperado
    return expect(readFile(invalidPath)).rejects.toEqual('Hubo un error en la lectura del archivo.');
  });
});
