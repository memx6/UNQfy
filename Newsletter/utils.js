const Newsletter = require('./model/newsletter'); 

const utils = {}

utils.getNewsletter = getNewsletter

const newsletter = new Newsletter

function getNewsletter() {
    return newsletter
}


module.exports = utils