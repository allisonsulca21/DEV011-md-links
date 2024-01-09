#MD-Links-allison

## Descripción

Este proyecto es una interfaz de línea de comandos (CLI) que te permite revisar archivos Markdown en busca de enlaces y realizar acciones como verificar su estado y obtener estadísticas. A continuación, encontrarás información detallada sobre la estructura del proyecto y cómo utilizarlo.

## Archivo cli.js

El archivo `cli.js` actúa como el punto de entrada de la aplicación CLI. Este script acepta argumentos de línea de comandos para indicar la ruta del archivo Markdown y opciones adicionales, como `--validate` para validar enlaces y `--stats` para obtener datos estadísticos.

## Archivo index.js

Dentro de `index.js` se encuentra la lógica principal del módulo `mdLinks`. Aquí se define la función principal que analiza archivos Markdown y devuelve los enlaces, junto con opciones adicionales de validación y estadísticas.

## Archivo function.js

El archivo `function.js` alberga funciones auxiliares utilizadas por `mdLinks` para llevar a cabo diversas tareas, como verificar la existencia de una ruta, convertir rutas a absolutas, leer el contenido de un archivo, encontrar enlaces en el contenido y validar enlaces.

##  Guía de uso 

* Para leer un archivo markdown y extraer sus enlaces 
```bash
./src/cli,js README3.md
```

* Para verificar el estado de cada uno de los links extraídos 
```bash
md-links README3.md --validate
```

Este comando muestra el estado de los enlaces encontrados en el archivo Markdown en la ruta especificada. 

* Para obtener un estadistica del archivo analizado. 

```bash
 md-links README3.md --stats
```

Este comando muestra incluyendo la cantidad total de enlaces encontrados y la cantidad de enlaces únicos presentes en el documento

*  Para mostrar la estadísticas básicas y los enlaces rotos en un archivo Markdown

```bash
 md-links README3.md --validate --stats
```

# Instalación

Puedes instalarlo directamente desde GitHub con el siguiente comando

```bash
  npm install allisonsulca21/md-links
```
