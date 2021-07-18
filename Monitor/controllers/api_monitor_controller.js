const ApiError = require('../Errors/ApiError');
const controller = {}
const utils = require('../utils.js')

controller.isActiveMonitor = (req, res, next) => {
    let toggleJson = req.body;
    console.log(req.body)
    if (isIncorrectJson(toggleJson) || hasIncorrectInformation(toggleJson)) {
        next(ApiError.badRequest());
        return;
    };
    let toggle = toggleJson.toggle;
    let monitor = utils.getMonitor()
    if (toggle === "Off"){
        monitor.turnOff();
    }else{
        monitor.turnOn();
    }
    console.log(monitor)
    res.status(200).json()
}


const isIncorrectJson = (toggleJson) => {
    return (   toggleJson.toggle === undefined 
        ||     ((Object.keys(toggleJson).length) !== 1)//Mandaron mas/menos campos de los que deberian
    )      
}

const hasIncorrectInformation = (toggleJson) => {
    return (toggleJson.toggle !== "On" && toggleJson.toggle !== "Off" )
}

module.exports = controller