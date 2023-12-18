// const { mdLinks } = require('/function.spec');
// const { convertAbsolute, existingPath } = require('../index.js');

jest.mock('./md-links.spec.js', () => ({
  convertAbsolute: jest.fn(),
  existingPath: jest.fn(),
}))

describe('mdLinks', () => {

  it('Debería resolver con el resultado de convertAbsolute si existingPath es verdadero', () => {

  });

});

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
