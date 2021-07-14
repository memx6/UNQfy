//Este es el observer que va a tener el UNQFY.
class DependencyTransformer {
    constructor(aspect,notificationFunction){
        this.aspect = aspect;
        this.notificationFunction = notificationFunction;
    }
    update(aspect,event){
        if (aspect === this.aspect){
            console.log("me llego el update");
            console.log(aspect);
            console.log(event);
            this.notificationFunction(event);
        }
    }
}

module.exports = DependencyTransformer;