const UNQFY_PORT = process.env["UNQFY-PORT"] || 3000;
const NEWSLETTER_PORT = process.env["NEWSLETTER-PORT"] || 3001;
const UNQFY_URL = `http://localhost:${UNQFY_PORT}/api/is-alive`
const NEWSLETTER_URL = `http://localhost:${NEWSLETTER_PORT}/api/is-alive`
const discordClient = require('../DiscordClient');
const services = [
    { url: UNQFY_URL, name: 'UNQfy', status: false},
    { url: NEWSLETTER_URL, name: 'Newsletter', status: false}
]

class Monitor {
    constructor(services){
        this.isActive = true;
        this.services = services
    }

    turnOn(){
        this.isActive = true;
    }

    turnOff(){
        this.isActive = false;
    }

    async checkService(service) {
        return isAliveService(service.url)
        .then(() => {
            if(!service.status){
                discordClient.notificationServiceActive(service.name);
                this.statusUnqfy = true;
            }
        })
        .catch(() => {
            if(service.status){
                discordClient.notificationServiceInactive(service.name)
                this.statusUnqfy = false;
            }
        }); 
    }

    async isAliveService(URL) {
        return rp.get(URL);
    }

    intervalFunction() {
        if(this.isActive) {
             this.services.map((service) => this.checkService(service));
        }
    }
}

module.exports = Monitor;

const monitor = new Monitor(services);

setInterval(monitor.intervalFunction, 1000);