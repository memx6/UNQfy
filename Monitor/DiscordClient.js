const URL_DISCORD = 'https://discord.com/api/webhooks/862706156811452456/XllzwPzsvJHg7PdAHTVMCcty4nZTawid9_IELqoRKHtHjbF8Jif63pmOy3ena8RSW70t'
const rp = require('request-promise');
const  discord = {}

const optionsForNotify = {
    method: 'POST',
    uri: URL_DISCORD,
    body: {},
    json: true
};

async function notificationServiceActive(serviceName){
    sendNotification((`El servicio ${serviceName} se encuentra nuevamente en servicio`));
}
async function notificationServiceInactive(serviceName){
    sendNotification((`El servicio ${serviceName} se encuentra fuera de servicio`));
}
async function sendNotification(msg) {
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