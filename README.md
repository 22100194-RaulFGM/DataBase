      ISC Ingeniería en Sistemas Computacionales
      22100194 Raúl Felipe Guevara Muñoz
      Programación Web

---------------------------------------------------------------------

# **ESTRUCTURA Y CONFIGURACIÓN DEL PROYECTO**  
  Proyecto de aplicación fullstack (back-end y front-end).  
  Permite gestionar una biblioteca de libros.  
  Con operaciones CRUD (crear, leer, actualizar, eliminar).  
  
---------------------------------------------------------------------

## **FLUJO GENERAL**  
  -  **USUARIO (navegador)**  
  -  **GITHUB PAGES (Frontend estático)**  
     [index.html, script.js, styles.css]  
  -  **FETCH / HTTP REQUESTS (desde script.js)**  
  - **RENDER (Backend Node.js + Express)**  
    [index.js, routes/libros.js, controllers/libroController.js, config/db.js]  
  - **MYSQL BASE DE DATOS (Railway)**  
    [Tabla Libro: id_libro, titulo, autor, editorial, fecha_publicacion, genero]  
    
----------------------------------------------------------------------

## **ARQUITECTURA DEL PROYECTO**  
  /Database  
  ├── config/db.js Configuración conexión MySQL  
  ├── controllers/ Lógica para manejar datos (CRUD)  
  ├── routes/libros.js Endpoints API REST  
  ├── index.js Servidor Express principal  
  ├── .env Variables de entorno  
  ├── package.json Configuración Node.js  
  ├── node_modules/ Dependencias instaladas  
  └── /fronted/ Archivos estáticos frontend (HTML, CSS, JS)  

---------------------------------------------------------------------

## **DETALLES TÉCNICOS**  
  | Componente              | Tecnologías                   |  
  |-------------------------|-------------------------------|  
  |Fronted                  |HTML, CSS, JavaScript (fetch)  |  
  |Backend                  |Node.js, Express, mySQL2       |  
  |Base de datos            |MySQL en Railway               |  
  |Hosting Fronted          |GitHub Pages                   |  
  |Hosting Backend          |Render                         |  
  |Conexión Variables       |dotenv, archivo .env           |  

---------------------------------------------------------------------

## **ARCHIVOS CLAVE**  
  |Archivo / Carpeta              |Descripción                                                           |  
  |-------------------------------|----------------------------------------------------------------------|  
  |.env                           |Guarda credenciales (host, user, pass, puerto) para MySQL             |  
  |package.json                   |Define dependencias (express, cors, mysql2, dotenv)                   |  
  |config / db.js                 |Abre conexión a MySQL usando las variables de entorno                 |  
  |controllers/libroController.js |Lógica CRUD para manejar libros                                       |  
  |routes / libros.js             |Define las rutas GET, POST, PUT, DELETE                               |  
  |index.js                       |Arranca el servidor Express, configura middleswares y rutas           |  
  |/Fronted/                      |Carpeta del sitio web: HTML, CSS, JS que hacen peticiones al backend  |  

---------------------------------------------------------------------  

## **CONCEPTOS CLAVE**  
  |Concepto       |Descripcion                                                 |  
  |---------------|------------------------------------------------------------|  
  |Express        |Framework para construir APIs en Node.js                    |  
  |mySQL2         |Librería para conectar Node.js a bases MySQL                |  
  |dotenv         |Carga automáticamente variables de .env                     |  
  |CORS           |Permite al frontend (otro dominio) hablar con el backend    |  
  |API REST       |Interfaz que permite manipular recursos (libros) vía HTTP   |  
  |GitHub Pages   |Hosting estático para webs                                  |  
  |Render         |Hosting para servidores backend                             |  
  |Railway        |Servicio para alojar bases de datos online                  |  

---------------------------------------------------------------------  

## **PROCESO Y DESARROLLO**  
  **Proceso**  
  1. El usuario abre GitHub Pages (Fronted).  
  2. El navegador carga HTML/CSS/JS.  
  3. El JS del navegador hace fetch a Render (backend).  
  4. El backend recibe la petición, consulta MySQL (Railway), obtiene los datos.  
  5. El backend responde al frontend con JSON.  
  6. El frontend muestra los resultados al usuario.

  **Desarrollo**  
  1. Desarrollas localmente.  
  2. Usas Railway para levantar la base de datos.  
  3. Subes tu backend a GitHub y Render lo despliega automáticamente.  
  4. Subes tu frontend a GitHub Pages.  
  5. Configuras variables de entorno en Render para conectar backend ↔ base de datos.  
  6. El frontend llama a Render, Render responde consultando Railway.

---------------------------------------------------------------------  

## **BACKEND**  
  1. Levanta un servidor web usando Express (index.js).  
  2. Escucha en un puerto (process.env.PORT o 3000).  
  3. Recibe peticiones (GET, POST, PUT, DELETE) en /api/libros.  
  4. Llama a los controladores (controllers/libroController.js), que ejecutan consultas a MySQL.  
  5. Devuelve respuestas JSON al frontend.

---------------------------------------------------------------------  

## **VARIABLES DE ENTORNO**  
  |Variable       |Descripcion                                                 |  
  |---------------|------------------------------------------------------------|  
  |MYSQLHOST      |Dirección del servidor MySQL                                |  
  |MYSQLPORT      |Puerto del servidor MySQL                                   |  
  |MYSQLUSER      |Usuario de MySQL                                            |  
  |MYSQLPASSWORD  |Contraseña de MySQL                                         |  
  |MYSQLDATABASE  |Nombre de la base de datos                                  |  
  |PORT           |Puerto donde el servidor Express escucha                    |  

---------------------------------------------------------------------  

## ****
