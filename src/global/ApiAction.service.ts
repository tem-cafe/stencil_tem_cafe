import { Subject } from "rxjs";
import { API_URL, temCafeApiModel, loginAPiModel, AppUser } from "./app";
export enum TypesRequesting {
    started = 0,
    stoped = 1,
    error = -1
}
export class ApiActionService {
    requesting: Subject<TypesRequesting> = new Subject()
    private CoffeeState: Subject<temCafeApiModel> = new Subject()
    private url = API_URL
    async cadUser(email: loginAPiModel['email'], password: loginAPiModel['password'], name: loginAPiModel['name']) {
        const body: loginAPiModel = { email, password, name }
        debugger
        const response = await this.request("/usuario", "POST", body)
        if (response.status == 200) {
            // this.requestCoffeeState()
        }
        return response.clone()
    }
    async login(email: loginAPiModel['email'], password: loginAPiModel['password']) {
        const body: loginAPiModel = { email, password }
        const response = await this.request("/login", "POST", body)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        return response.clone()
    }
    async haveCoffee() {
        const body: temCafeApiModel = { temCafe: true, email: AppUser.get().email, name: AppUser.get().name }
        const response = await this.request("/tem-cafe", "POST", body)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        return response.clone()
    }
    async dontHaveCoffee() {
        const body: temCafeApiModel = { temCafe: false, email: AppUser.get().email, name: AppUser.get().name }
        const response = await this.request("/tem-cafe", "POST", body)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        return response.clone()
    }
    async makingCoffee() {
        const body: temCafeApiModel = { fizCafe: true, email: AppUser.get().email }
        const response = await this.request("/tem-cafe", "POST", body)
        if (response.status == 200) {
            this.requestCoffeeState()
        }
        return response.clone()
    }
    public getCoffeeState() {
        return this.CoffeeState.asObservable()
    }

    async requestCoffeeState() {
        const response = await this.request("/tem-cafe", "GET")
        if (response.status == 200) {
            this.CoffeeState.next((await response.json()))
            this.requesting.next(TypesRequesting.stoped)
        }
    }
    private async request(path: string, method: RequestInit['method'], act?: temCafeApiModel | loginAPiModel): Promise<Response> {

        let init: RequestInit = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method,

            body: JSON.stringify(act)
        }
        if (init.method === "GET") {
            delete init['body']
        }
        try {
            this.requesting.next(TypesRequesting.started)
            return new Promise((r) => {
                fetch(this.url + path, init).then(i => {
                    if (i.status != 200 && i.status != 201) {
                        this.requesting.next(TypesRequesting.error)
                    }
                    r(i.clone())
                }, r => { r(r.clone()); throw ""; })
            })

        }
        catch (e) {
            debugger
            this.requesting.next(TypesRequesting.error)
            return await new Promise((resolve) => {
                resolve(new Response(null, { status: 503 }))
            })
        }
    }
}