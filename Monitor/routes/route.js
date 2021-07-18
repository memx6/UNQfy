let router_invalidRoute = require('./invalidRoute')
let router_monitor_api = require('./apiRoute')

function seteoRutas(app){
    app.use('/api',router_monitor_api);
    app.use('*', router_invalidRoute);
}
module.exports.seteoRutas = seteoRutas;






