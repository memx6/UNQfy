const discordClient = require('../DiscordClient');
const rp = require('request-promise');

class Monitor {
    constructor(services){
        this.isActive = true;
        this.services = services;
    }

    turnOn(){
        this.isActive = true;
    }

    turnOff(){
        this.isActive = false;
    }

    checkService(service) {
        return this.isAliveService(service.url)
        .then(() => {
            if(!service.status){
                discordClient.notificationServiceActive(service.name);
                service.status = true;
            }
        })
        .catch(() => {
            if(service.status){
                discordClient.notificationServiceInactive(service.name)
                service.status = false;
            }
        }); 
    }

    isAliveService(URL) {
        return rp.get(URL);
    }

    servicesStatus() {
        let response = {};
        this.services.forEach(service => { response= {...response , [service.name] : service.status? "Servicio Activo" : "Servicio Inactivo"} });
        return response;
    }

    intervalFunction() {
        if(this.isActive) {
            this.services.map((service) => this.checkService(service));
        }
    }

    startCheck(){
        setInterval(this.intervalFunction.bind(this), 1000);
    }
}
module.exports = Monitor;

