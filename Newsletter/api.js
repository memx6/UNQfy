const express = require('express')
const route = require("./routes/route")
const apiErrorHandler = require('./Errors/ErrorHandler')
let bodyParser = require('body-parser')
const NEWSLETTER_PORT = process.env["NEWSLETTER-PORT"] || 3001;
//Creacion de app
const app = express();

const port = NEWSLETTER_PORT;

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//Seteo rutas
route.seteoRutas(app);

//Seteo del error handler:
app.use(apiErrorHandler);



app.listen(port, ()=> {
    console.log("Servidor escuchando")
})