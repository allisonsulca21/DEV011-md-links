jest.mock('', () => jest.fn());
//const { axios } = require("axios");
const axios = require('axios');

const {
    convertAbsolute,
    existingPath,
    extentionFilePath,
    validateLinks,
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
    const pathExistent= 'C:\\Users\\Sulca\\DEV011-md-links\\docs\\02-milestone.md';
    const pathNotExistent= 'C:\\Users\\Sulca\\DEV011-md-links\\docs\\02-milest.m';
    it('Verifica si la ruta existe o no', () => {
        expect(existingPath(pathExistent)).toBe(true);
        expect(existingPath(pathNotExistent)).toBe(false);
    });
})

// Test 3
describe('nameExt', () => {
    const pathAbsolute= 'C:/Users/Sulca/DEV011-md-links/docs/03-milestone.md';
    const pathRelative= '';
    it('Verifica si la ruta es un archivo .md o no', () => {
        // expect(extentionFilePath(pathRelative)).toBe((pathAbsolute));
        expect(extentionFilePath(pathAbsolute)).toBe('.md');
        expect(extentionFilePath(pathRelative)).not.toBe('.md');
    });
})

// Test 4
//Testeando Axios:
// Mock out all top level functions, such as get, put, delete and post:
jest.mock('axios');

describe('validateLinks', () => {
    it('Debería retornar una promesa que resuelve a un array de objetos validados', () => {
        const links = [
        { href: 'https://linkExample1.com', text: 'Example 1', file: 'archivo.md' },
        { href: 'https://linkExample2.com', text: 'Example 2', file: 'archivo.md' },
        ];
        // mock axios necesario para solicitudes HTTP
        console.log("karen")
        axios.get.mockResolvedValue({ status: 200, statusText: 'OK' });
        return expect(validateLinks(links)).resolves.toEqual([
          { href: 'https://linkExample1.com', text: 'Example 1', file: 'archivo.md', status: 200, statusText: 'OK' },
          { href: 'https://linkExample2.com', text: 'Example 2', file: 'archivo.md', status: 200, statusText: 'OK' },
        ]);
    });
    it('Debería manejar errores de solicitudes HTTP mostrando un statusText: Fail', () => {
        const linksFail = [
        { href: 'https://linkExample1.com', text: 'Example 1', file: 'archivo.md' },
        { href: 'https://linkExample2.com', text: 'Example 2', file: 'archivo.md' },
        ];
        // mock axios necesario para solicitudes HTTP
        axios.get.mockRejectedValue({ status: 404, statusText: 'Not found' });
        return expect(validateLinks(linksFail)).resolves.toEqual([
          { href: 'https://linkExample1.com', text: 'Example 1', file: 'archivo.md', status: 404, statusText: 'Not found' },
          { href: 'https://linkExample2.com', text: 'Example 2', file: 'archivo.md', status: 404, statusText: 'Not found' },
        ]);
    });
});

// describe('validateLinks', () => {
//     it('Debería validar correctamente los enlaces', async () => {
//       const links = [
//         { href: 'https://www.linkExample.com', text: 'Example 1', file: 'archivo.md' },
//       ];
  
//       const result = await validateLinks(links);
  
//       // Verifica que la longitud del resultado sea igual a la longitud de los enlaces de entrada
//       expect(result.length).toBe(links.length);
  
//       // Verifica que cada objeto de enlace tenga las propiedades de estado esperadas
//       result.forEach((link) => {
//         expect(link).toHaveProperty('status');
//         expect(link).toHaveProperty('statusText');
//       });
//     });
//     // Agrega más casos de prueba según sea necesario, por ejemplo, para manejar enlaces que devuelven errores
//   });

