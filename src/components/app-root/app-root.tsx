import { Component, h, Prop } from '@stencil/core';
import { LocalStorageSevice, coffeState } from '../../global/app';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @Prop() coffeState: string;

  componentDidLoad() {
    coffeState.asObservable().subscribe(item => {
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

        default:
          break;
      }
    })
    console.log(LocalStorageSevice._key)
  }
  checkLogin() {

  }
  getTemCafe() {
    return "👍"
  }
  render() {
    return (
      <div>
        <header>
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
