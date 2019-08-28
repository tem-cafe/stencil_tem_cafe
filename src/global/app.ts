import { GenericService } from "./LocalStorage.service";
import { ApiActionService } from "./ApiAction.service";
import { Subject, BehaviorSubject } from "rxjs";
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
interface user extends dbModel{
name:string;
token:string
}
export var coffeState = new BehaviorSubject(1)
export var LocalStorageSevice = new GenericService<user>('user');
export var ApiActions = new ApiActionService()
