const express = require('express')
const route = require("./routes/route")
const apiErrorHandler = require('./Errors/ErrorHandler')
const monitor = require('./utils.js')

monitor.getMonitor().startCheck()
//Creacion de app
const app = express();

const port = 5002;//Puede haber ENV

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Seteo rutas
route.seteoRutas(app);

//Seteo del error handler:
app.use(apiErrorHandler);


app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})