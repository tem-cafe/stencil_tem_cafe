import { Component, h, Prop } from '@stencil/core';
import { ApiActions } from '../../global/app';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: false
})
export class AppRoot {
  @Prop({mutable:true}) coffeState: string;

  async componentDidLoad() {
    ApiActions.getCoffeeState().subscribe(async item => {
      switch (item) {
        case 1:
          this.coffeState = "👍"
          break;
        case 2:
          this.coffeState = "👎"
          break;
        case 3:
          this.coffeState = "♨️"
          break;
        case 0:
            this.coffeState = <ion-spinner></ion-spinner>
            break;
        default:
            this.coffeState = "💤";
          break;
      }
    })
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
