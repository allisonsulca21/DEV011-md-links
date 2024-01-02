const { validateLinks } = require("./src/function.js");

const mockLinks = [
  {
    href: "https://markdown.es/",
    text: "Markdown",
    file: "test.md",
  },
];
describe("validateLinks", () => {
  it("Debe validar el elemento href", (done) => {
    validateLinks(mockLinks).then((res) => {
      expect(res).toEqual([
        {
          href: "https://markdown.es/",
          text: "Markdown",
          file: "test.md",
          status: 200,
          statusText: "OK",
        },
      ]);
    });
    done();
  });
});

describe("validateLinks", () => {
it('Debe omitir status y status text si el elemento es falso', (done) => {
  validateLinks(mockLinks).catch((err) => {
    expect(err).toEqual([
      {
        href: "https://markdown.es/",
        text: "Markdown",
        file: "test.md",
        status: 404,
        statusText: 'error',
      }
    ])
  })
  done()
})
});