const express = require('express');
const route = require("./routes/route");
const apiErrorHandler = require('./Errors/ErrorHandler');
let bodyParser = require('body-parser');
const UNQFY_PORT = process.env['UNQFY_PORT'] || 5000;

//Creacion de app
const app = express();

const port = UNQFY_PORT;

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//Seteo rutas
route.seteoRutas(app);

//Seteo del error handler:
app.use(apiErrorHandler);



app.listen(port, ()=> {
    console.log(`Servidor escuchando en el puerto ${UNQFY_PORT}`)
});