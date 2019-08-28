import { Component, h, Prop } from '@stencil/core';
import { ApiActions } from '../../global/app';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {
  @Prop() history: RouterHistory;
  render() {
    return (
      <div class='app-home'>
        <h1 class="click-warning">TEM CAFÉ?</h1>
        <p class="click-warning">click no card para avisar geral</p>
        <div class="cards">
          <div class="card" onClick={() => this.vote(1)}>
            <p class="icon">👍</p>
            <div class="container">
              <h4><b>TEM CAFÉ AGORA</b></h4>
            </div>
          </div>
          <div class="card"onClick={() => this.vote(2)}>
            <p class="icon">👎</p>
            <div class="container">
              <h4><b> NÃO TEM CAFÉ AGORA</b></h4>
            </div>
          </div>

        </div>
        <div class="cards-botton" onClick={() => this.vote(3)}>
          <div class="card botton">
            <p class="icon">♨️</p>
            <div class="container">
              <h4><b> TO FAZENDO</b></h4>
            </div>
          </div>
        </div>

        {/* <stencil-route-link url='/profile/stencil'>
          <button>
            Ação
          </button>
        </stencil-route-link> */}
      </div>
    );
  }
  vote(type: number): void {
    switch (type) {
      case 1:
        ApiActions.haveCoffee()
        this.history.push(`/profile/1`, {});
        break;
      case 2:
        ApiActions.dontHaveCoffee()
        this.history.push(`/profile/2`, {});
        break;
      case 3:
        ApiActions.makingCoffee()
        this.history.push(`/profile/3`, {});
        break;
      default:
        break;
    }
  }
}
