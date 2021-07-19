const Monitor = require('./model/monitor'); 
const UNQFY_PORT = process.env["UNQFY_PORT"] || "http://localhost:5000";
const NEWSLETTER_PORT = process.env["NEWSLETTER_PORT"] || "http://localhost:5001";
const UNQFY_URL = `${UNQFY_PORT}/api/is-alive`
const NEWSLETTER_URL = `${NEWSLETTER_PORT}/api/is-alive`
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