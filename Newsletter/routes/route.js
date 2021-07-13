let router_invalidRoute = require('./invalidRoute')
let router_newsletter_api = require('./api')

function seteoRutas(app){
    app.use('/api',router_newsletter_api);
    app.use('*', router_invalidRoute);
}
module.exports.seteoRutas = seteoRutas;