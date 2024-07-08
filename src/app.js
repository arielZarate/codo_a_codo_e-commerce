/*--------SERVIDOR ESTATICO CON EXPRESS-------*/
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");

//DOTENV
require("dotenv").config();

//=================================================

const app = express();
const path = require("path");

app.use(express.json()); // express
app.use(morgan("dev")); //morgan
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "public")));

//==============================================

// Configurar express-session para manejar sesiones
app.use(
  session({
    secret: process.env.SESSION_SECRET || "rociopagtelabirra", // Clave secreta para firmar la sesión
    resave: false,
    saveUninitialized: true,

    // Cookie options
    cookie: {
      secure: false, // Si es true, solo se enviará la cookie sobre HTTPS
      httpOnly: true, // Impide que JavaScript acceda a la cookie en el cliente
      maxAge: 60 * 60 * 1000, // Tiempo de vida de la cookie en milisegundos (1 hora)
    },
  })
);

//===========================================

//en vez de sobrecargar el archivo de ejecucion usamos un index con todas las rutas
const indexRouter = require("./routes/index");

//  la convencion de api
app.use("/api", indexRouter);

//EXPORTAMOS EN MODULO PARA USARLO EN EL INDEX
module.exports = app;

//COMANDOS PARA INSTALAR NODE y EXPRESS
// npm init -y
//npm install express --save

// COMANDO para instalar NODEMON: npm install -D nodemon
//COMANDO PARA ACTIVARLO: node --watch index.js
//COMANDO para instalar morgan: npm i morgan. Da más detalles de los errores que pudieran haber

//  CORS PENDIENTE

// const cors=require("cors"); en index.js

// despues app.use(cors())antes de todo y despues de express en index.js;
