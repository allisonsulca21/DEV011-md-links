jest.mock('', () => jest.fn());

// const {
//     convertAbsolute
// } = require('./index')
const {
    convertAbsolute,
    existingPath,
    extentionFilePath,
    extractLinks
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
describe('extractLinks', () => {
    const anchor = {
        href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_expressions',
        text: 'Patrones para coincidencia de caracteres con expresiones regulares - mozilla.org',
        file: ''
    };
    const linksInfo = {
       href: '',
       text: '',
       file: '',
    };
    it('Lee la información del link', () => {
        // expect(extentionFilePath(pathRelative)).toBe((pathAbsolute));
        // expect(extractLinks(anchor)).toEqual(anchor['']);
        expect(anchorEtqA(anchor)).toBe(anchor);
        expect(anchorEtqA(linksInfo)).not.toBe(anchor);
    });
})