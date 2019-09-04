import { Subject } from "rxjs";
import { API_URL } from "./app";

enum Actions {
    error = -1,
    check = 0,
    have = 1,
    dontHave = 2,
    making = 3
}
export class ApiActionService {
    private CoffeeState:Subject<Actions> = new Subject()
    private url = API_URL
    constructor() { }
    async haveCoffee() {
        const response = await this.request(Actions.have)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        else{
            this.CoffeeState.next(Actions.error)
        }
        return response.clone()
    }
    async dontHaveCoffee() {
        const response = await this.request(Actions.dontHave)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        else{
            this.CoffeeState.next(Actions.error)
        }
        return response.clone()
    }
    async makingCoffee() {
        const response = await this.request(Actions.making)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        else{
            this.CoffeeState.next(Actions.error)
        }
        return response.clone()
    }
    public getCoffeeState(){
        return this.CoffeeState.asObservable()
    }
    
    async requestCoffeeState(){
        this.CoffeeState.next(Actions.check)
        const response = await this.request(Actions.check)
        if (response.status == 200) {
            this.CoffeeState.next((await response.json()))
        }
        else{
            this.CoffeeState.next(Actions.error)
        }
    }
    private async request(act: Actions):Promise<Response> {
        try {
            return await  fetch(this.url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ action: act })
            })
        }
        catch (e) {
            return await  new Promise((resolve) =>{
                resolve(new Response(null,{status:503}))
            })
        }
    }
}