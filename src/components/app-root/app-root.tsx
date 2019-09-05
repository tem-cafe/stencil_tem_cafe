import { Component, h, Prop } from '@stencil/core';
import { ApiActions, notificationsService } from '../../global/app';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  @Prop({ mutable: true }) coffeState: string;

  async componentDidLoad() {
    ApiActions.getCoffeeState().subscribe(async item => {
      switch (item) {
        case 0:
          this.coffeState = <ion-spinner></ion-spinner>
          break;
        case 1:
          this.coffeState = "👍"
          notificationsService.notify("Alou TEM CAFÉ")
          break;
        case 2:
          this.coffeState = "👎"
          notificationsService.notify("cabô café")
          break;
        case 3:
          this.coffeState = "♨️"
          notificationsService.notify("café on the making!!")
          break;
        default:
          this.coffeState = "💤";
          break;
      }
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
          <h1>Tem_Café: {this.coffeState}</h1>
          <div><a class="refresh" onClick={()=>ApiActions.requestCoffeeState()}>🔄</a></div>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/profile/:name' component='app-profile' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
