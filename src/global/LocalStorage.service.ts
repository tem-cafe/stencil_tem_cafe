import { BehaviorSubject, Observable } from 'rxjs'
export declare class IGenericService<T>{
    keepMeUpdated(): Observable<T>;
    get(): T
    set(objs: T)
    insert(obj: T)
    delete(obj: T)
    update(obj:T)
}
export class GenericService<T> implements IGenericService<T>{
    _value: BehaviorSubject<T> = new BehaviorSubject(null)
    _className: string;
    _key: string;

    constructor(key: string) {
        this._key = key
        this._className = this.constructor.name
    }
    keepMeUpdated(): Observable<T> {
        return this._value.asObservable()
    }
    get(): T {
        const lsRaw = localStorage.getItem(this._key)
        if (!lsRaw || lsRaw === "[]") {
            return null
        }
        try {
            return JSON.parse(lsRaw)
        } catch (error) {
            throw this._className + ": " + error
        }

    }
    set(objs: T) {
        localStorage.setItem(this._key, JSON.stringify(objs))
        this._value.next(this.get())
    }
    insert(obj: T) {
        this.set(obj)
    }
    delete() {
        this.set(null)
    }
    update(obj:T){
        this.set(obj)
    }

}