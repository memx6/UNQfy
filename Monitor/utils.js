const Monitor = require('./model/monitor'); 
const UNQFY_PORT = process.env["UNQFY-PORT"] || 3000;
const NEWSLETTER_PORT = process.env["NEWSLETTER-PORT"] || 3001;
const UNQFY_URL = `http://localhost:${UNQFY_PORT}/api/is-alive`
const NEWSLETTER_URL = `http://localhost:${NEWSLETTER_PORT}/api/is-alive`
const services = [
    { url: UNQFY_URL, name: 'UNQfy', status: false},
    { url: NEWSLETTER_URL, name: 'Newsletter', status: false}
]
const utils = {}

utils.getMonitor = getMonitor

const monitor = new Monitor(services)

function getMonitor() {
    return monitor
}

module.exports = utils