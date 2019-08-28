import { coffeState } from "./app";

enum Actions{
    have=1,
    dontHave=2,
    making=3

}
export class ApiActionService {
    private url = "https://api"
    constructor() { }
    haveCoffee() {
        coffeState.next(1)
        return this.request(Actions.have)
    }
    dontHaveCoffee() {
        coffeState.next(2)
        return this.request(Actions.dontHave)
    }
    makingCoffee() {
        coffeState.next(3)
        return this.request(Actions.making)
    }
    private request(act:Actions) {
        return fetch(this.url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body:JSON.stringify( {action:act})
        })
    }
}