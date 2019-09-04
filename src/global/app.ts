import { GenericService } from "./LocalStorage.service";
import { ApiActionService } from "./ApiAction.service";
import { BehaviorSubject } from "rxjs";
// import 'bootstrap'
export interface dbModel{
  id:number
}
export default async () => {

  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */
};
export interface user extends dbModel{
name:string;
token:string
}
export const API_URL= "http://cade.a.api:3000"
export var coffeState = new BehaviorSubject(1)
export var LocalStorageSevice = new GenericService<user>('user');
export var ApiActions = new ApiActionService()
