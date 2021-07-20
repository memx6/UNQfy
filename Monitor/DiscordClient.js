const URL_DISCORD = 'https://discord.com/api/webhooks/862706156811452456/XllzwPzsvJHg7PdAHTVMCcty4nZTawid9_IELqoRKHtHjbF8Jif63pmOy3ena8RSW70t'
const rp = require('request-promise');
const  discord = {}

const optionsForNotify = {
    method: 'POST',
    uri: URL_DISCORD,
    body: {},
    json: true
};

function getTime(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let  dateTime = date+' '+time;
    return dateTime;
}

function serviceNotification(serviceName, isActive) {
    if(isActive){
        sendNotification((`${getTime()} El servicio ${serviceName} se encuentra nuevamente en servicio`));
    }else {
        sendNotification((`${getTime()} El servicio ${serviceName} se encuentra fuera de servicio`));
    }
}

function notificationServiceActive(serviceName){
    serviceNotification(serviceName, true)
}

function notificationServiceInactive(serviceName){
    serviceNotification(serviceName, false)
}

function sendNotification(msg) {
    const requestBody = 
        {
            content: msg
        };
    optionsForNotify.body = requestBody;
    rp(optionsForNotify);
}

discord.sendNotification = sendNotification
discord.notificationServiceActive = notificationServiceActive
discord.notificationServiceInactive = notificationServiceInactive

module.exports = discord