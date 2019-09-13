export class NotificationsService{
    constructor(){

    }
    notify(msg:string){
        try {
            navigator.serviceWorker.controller.postMessage(msg)
        } catch (error) {
            console.log(error)
            console.error("fail to send notification")
        }
    }
}