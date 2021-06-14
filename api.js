const express = require('express')
const route = require("./routes/route")
const apiErrorHandler = require('./Errors/ErrorHandler')
let bodyParser = require('body-parser')
//Creacion de app
const app = express();

const port = 3000;

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

//Seteo rutas
route.seteoRutas(app);

//Seteo del error handler:
app.use(apiErrorHandler);

app.get('/', function (req, res) {
    res.send('hello world')
})



app.listen(port, ()=> {
    console.log("Servidor escuchando")
})