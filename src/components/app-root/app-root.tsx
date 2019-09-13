import { Component, h, Prop,Listen } from '@stencil/core';
import { ApiActions, notificationsService, loginAPiModel, AppUser, temCafeApiModel } from '../../global/app';
import { toastController } from '@ionic/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  @Prop({ mutable: true }) coffeStateText: string;
  @Prop({ mutable: true }) coffeState: temCafeApiModel = null;
  @Prop({ mutable: true }) user: loginAPiModel;

  @Listen("swUpdate", { target: 'window' })
async onSWUpdate() {
  debugger
  const registration = await navigator.serviceWorker.getRegistration();

  if (!registration || !registration.waiting) {
    // If there is no registration, this is the first service
    // worker to be installed. registration.waiting is the one
    // waiting to be activiated.
    return;
  }

  const toast = await toastController.create({
    message: "New version available",
    showCloseButton: true,
    closeButtonText: "Reload"
  });

  await toast.present();
  await toast.onWillDismiss();

  registration.waiting.postMessage("skipWaiting");
  window.location.reload();
}
  async componentDidLoad() {
    AppUser.keepMeUpdated().subscribe(item => {
      this.user = item
    })
    this.user = AppUser.get()
    ApiActions.requesting.asObservable().subscribe(item => {
      switch (item) {
        case 0:
          this.coffeStateText = <ion-spinner></ion-spinner>
          break;
        case 1:
          break
        default:
          this.coffeStateText = "💤";
          break;
      }
    })
    ApiActions.getCoffeeState().subscribe(async item => {
      if (this.coffeState) {
        if (item.temCafe) {
          this.coffeStateText = <i class="fa fa-thumbs-up" aria-hidden="true"></i>
          if (item.temCafe != this.coffeState.temCafe) {
            notificationsService.notify("Alou TEM CAFÉ")
          }
        }
        else {
          this.coffeStateText = <i class="fa fa-thumbs-down" aria-hidden="true"></i>
          if (item.temCafe != this.coffeState.temCafe) {
            notificationsService.notify("cabô café")
          }
        }
      }
      this.coffeState = item
    })
    ApiActions.requestCoffeeState()
  }
  checkLogin() {

  }
  getTemCafe() {
    return "👍"
  }
  render() {
    return (
      <div>
        <header class="header">
          <h1>Tem_Café: {this.coffeStateText}</h1>
          <div><a class="refresh" onClick={() => AppUser.delete()}><i class="fa fa-sign-out" aria-hidden="true"></i></a></div>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              {this.user ? <stencil-route url='/' component='app-home' exact={true} /> : <stencil-route url='/' component='app-login' exact={true} />}
              <stencil-route url='/cad-user' component='cad-user' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
