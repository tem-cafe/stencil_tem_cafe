import { Component, h, Prop } from '@stencil/core';
import { ApiActions, notificationsService, loginAPiModel, AppUser, temCafeApiModel } from '../../global/app';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  @Prop({ mutable: true }) coffeStateText: string;
  @Prop({ mutable: true }) coffeState: temCafeApiModel = null;
  @Prop({ mutable: true }) user: loginAPiModel;
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
