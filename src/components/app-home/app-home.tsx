// declare let $: any
import { Component, h, Prop } from '@stencil/core';
import { ApiActions } from '../../global/app';
import { RouterHistory } from '@stencil/router';
import { toastController } from '@ionic/core'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: false
})
export class AppHome {
  @Prop() history: RouterHistory;
  @Prop({ mutable: true }) toastMsg: string;
  @Prop({ mutable: true })spinner: boolean = false;

  render() {
    return (
      <div class='app-home'>
        
        <h1 class="page-title">TEM CAFÉ?</h1>
        <div class="page-subTitle">{this.spinner?<ion-spinner class="click-warning"></ion-spinner>:<p class="click-warning">click no card para avisar geral</p>}
        </div>
        <div class="page-body">
        <div class="cards">
          <div class="card" onClick={() => this.vote(1)}>
            <p class="icon"><i class="fa fa-thumbs-up" aria-hidden="true"></i></p>
            <div class="container">
              <h4><b>TEM CAFÉ AGORA</b></h4>
            </div>
          </div>
          <div class="card" onClick={() => this.vote(2)}>
            <p class="icon"><i class="fa fa-thumbs-down" aria-hidden="true"></i></p>
            <div class="container">
              <h4><b> NÃO TEM CAFÉ AGORA</b></h4>
            </div>
          </div>

        </div>
        <div class="cards-botton" onClick={() => this.vote(3)}>
          <div class="card botton">
            <p class="icon"><i class="fa fa-coffee" aria-hidden="true"></i><i class="fa fa-thermometer-full" aria-hidden="true"></i></p>
            <div class="container">
              <h4><b> FIZ CAFÉ!!</b></h4>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
  async vote(type: number) {
    this.spinner = true
    let response: Promise<Response> = null
    switch (type) {
      case 1:
        response = ApiActions.haveCoffee()
        break;
      case 2:
        response = ApiActions.dontHaveCoffee()
        break;
      case 3:
        response = ApiActions.makingCoffee()
        break;
    }
    ((await response).status == 200) ? this.toastResolve(type) : this.toastReject()
    this.spinner = false

  }
  async toastResolve(type: number) {
    let toastCtrl = await toastController.create({
      message: `Blz, registramos que ${this.normalize(type)} café. vlw `,
      duration: 2000
    });
    toastCtrl.present()
  }
  async toastReject() {
    let toastCtrl = await toastController.create({
      message: `Falha ao enviar aviso<br> tente novamente mais tarde`,
      duration: 2000
    });
    toastCtrl.present()
  }
  normalize(name: number): string {
    switch (name) {
      case 1:
        return "tem"
      case 2:
        return "não tem"
      case 3:
        return "você fez o"
      default:
        break;
    }
  }
}
