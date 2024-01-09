#MD-Links-allison

## Descripción

Este proyecto es una interfaz de línea de comandos (CLI) que te permite revisar archivos Markdown en busca de enlaces y realizar acciones como verificar su estado y obtener estadísticas. A continuación, encontrarás información detallada sobre la estructura del proyecto y cómo utilizarlo.

## Archivo cli.js

El archivo `cli.js` actúa como el punto de entrada de la aplicación CLI. Este script acepta argumentos de línea de comandos para indicar la ruta del archivo Markdown y opciones adicionales, como `--validate` para validar enlaces y `--stats` para obtener datos estadísticos.

## Archivo index.js

Dentro de `index.js` se encuentra la lógica principal del módulo `mdLinks`. Aquí se define la función principal que analiza archivos Markdown y devuelve los enlaces, junto con opciones adicionales de validación y estadísticas.

## Archivo function.js

El archivo `function.js` alberga funciones auxiliares utilizadas por `mdLinks` para llevar a cabo diversas tareas, como verificar la existencia de una ruta, convertir rutas a absolutas, leer el contenido de un archivo, encontrar enlaces en el contenido y validar enlaces.

# Instalación

Para instalar la dependencia de validación de enlaces Markdown, ejecuta el siguiente comando en tu terminal:

```bash
npm install md-links-allison
```

También puedes instalarlo directamente desde GitHub con este comando:

```bash
npm install 
```
