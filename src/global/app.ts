import { GenericService } from "./LocalStorage.service";
import { ApiActionService } from "./ApiAction.service";
import { BehaviorSubject } from "rxjs";
import { NotificationsService } from "./NotificationsService";
// import 'bootstrap'
export interface dbModel{
  id:number
}
export default async () => {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    Notification.requestPermission(status => {
      console.log(`Notification permissions have been ${status}`);
    });
  }

  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */
};
export interface IUser extends dbModel{
name:string;
token:string
}
export interface IAppSettings extends dbModel{
  showNotificationHave:boolean
  showNotificationDontHave:boolean
  showNotificationMaking:boolean
}
export var notificationsService = new NotificationsService()
export const API_URL= "https://cade.a.api:3000"
export var coffeState = new BehaviorSubject(1)
export var appSetting = new GenericService<IAppSettings>('settings');
export var ApiActions = new ApiActionService()
