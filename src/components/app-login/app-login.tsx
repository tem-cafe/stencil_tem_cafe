import { Component, h, Element, State } from '@stencil/core';
import { ApiActions, AppUser } from '../../global/app';

@Component({
  tag: 'app-login',
  styleUrl: 'app-login.css',
  shadow: false
})
export class AppLogin {
  @Element() el: HTMLElement
  @State() email: string
  @State()password: string
  async handleSubmit(e) {
    e.preventDefault()
    
    const result = await ApiActions.login(this.email,this.password)
    const resultJson = await result.json()
    if(result.status === 200){
      AppUser.set({email:resultJson.email,name:resultJson.name})
    }
    location.assign("/")

    // send data to our backend
  }

  handleChange(variable, event) {
    this[variable] = event.target.value;
  }
  render() {
    return (
      <div class="body">
        <div class="wrapper fadeInDown">
          <div id="formContent">

            <div class="fadeIn first">
              <img src="http://cdn.onlinewebfonts.com/svg/img_311846.png" id="icon" alt="User Icon" />
            </div>

            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input type="email" value={this.email} onInput={(event) => this.handleChange('email', event)} id="login" class="fadeIn second" name="login" placeholder="E-mail" />
              <input type="password" value={this.password} onInput={(event) => this.handleChange('password', event)} id="password" class="fadeIn third" name="login" placeholder="password" />
              <input type="submit" class="fadeIn fourth" value="Log In" />
            </form>

            <div id="formFooter">
              <a class="underlineHover" href="cad-user">Criar Usuario</a><br></br>
              <a class="underlineHover" href="#">Esqueceu a senha?</a>
            </div>

          </div>
        </div>
      </div>
    );
  }

}
