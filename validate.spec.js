const axios = require('axios');
const { validateLinks } = require("./src/function.js");

//Testeando Axios:
// Mock the axios module (Mock out all top level functions, such as get, put, delete and post)
jest.mock('axios');

// Definimos el comportamiento de axios en nuestro test
describe('validateLinks', () => {
  it('debería manejar una solicitud de manera exitosa mostrando un status: ok', async () => {
    const link = { href: 'https://example.com' };
    const response = { status: 200 };

    // Mockeamos axios.head para resolver con un status exitoso = 200
    axios.head.mockResolvedValue(response);

    // Llamamos nuestra función validateLinks
    const result = await validateLinks(link);

    // Que es lo que esperamos que suceda basándonos en nuestra mock data
    expect(result).toEqual({
      href: 'https://example.com',
      status: 200,
      ok: 'ok',
    });
  });

  it('debería manejar errores de solicitudes HTTP mostrando un statusText: Fail', async () => {
    const link = { href: 'https://example.com' };

    // Mockeamos axios.head para rechazarlo con un error
    axios.head.mockRejectedValue(new Error('Solicitud Rechazada'));

    const result = await validateLinks(link);

    expect(result).toEqual({
      href: 'https://example.com',
      status: 404,
      ok: 'fail',
    });
  });
});
