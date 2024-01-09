#!/usr/bin/env node 
// este es el permiso de ejecución para realizarlo con node.js

const { mdLinks } = require('./index')
const process = require('process')

const validate = process.argv.includes("--validate");
const ruta = process.argv[2]
const stats = process.argv.includes("--stats");

// mdLinks(ruta, { validate: validate })
mdLinks(ruta, { validate, stats })
   .then(result => console.log('CORRECT', result))
   .catch(error => console.log('ERROR', error));
