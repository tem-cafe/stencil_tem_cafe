import { BehaviorSubject, Observable } from 'rxjs'
import { dbModel } from './app';
export declare class IGenericService<T>{
    keepMeUpdated(): Observable<T[]>;
    get(): T[]
    set(objs: T[])
    insert(obj: T)
    delete(obj: T)
    update(obj:T)
}
export class GenericService<T extends dbModel> implements IGenericService<T>{
    _value: BehaviorSubject<T[]> = new BehaviorSubject([])
    _className: string;
    _key: string;

    constructor(key: string) {
        this._key = key
        this._className = this.constructor.name
    }
    keepMeUpdated(): Observable<T[]> {
        return this._value.asObservable()
    }
    get(): T[] {
        const lsRaw = localStorage.getItem(this._key)
        if (!lsRaw || lsRaw === "[]") {
            return new Array()
        }
        try {
            return JSON.parse(lsRaw)
        } catch (error) {
            throw this._className + ": " + error
        }

    }
    set(objs: T[]) {
        localStorage.setItem(this._key, JSON.stringify(objs))
        this._value.next(this.get())
    }
    insert(obj: T) {
        let db = this.get();
        db.push(obj)
        this.set(db)
    }
    delete(obj: T) {
        let db = this.get();
        this.set(db.filter(item=>item.id !== obj.id))
    }
    update(obj:T){
        let db = this.get();
        this.set(db.map(item=>{
            if(item.id === obj.id){
                item = obj
            }
            return item
        }))
    }

}