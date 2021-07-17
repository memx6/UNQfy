const Monitor = require('./model/monitor'); 

const utils = {}

utils.getMonitor = getMonitor

const monitor = new Monitor

function getMonitor() {
    return monitor
}


module.exports = utils