import { Component, h, Element, State } from '@stencil/core';
import { ApiActions, AppUser } from '../../global/app';

@Component({
  tag: 'cad-user',
  styleUrl: 'cad-user.css',
  shadow: true
})
export class CadUser {
  @Element() el: HTMLElement
  @State() email: string ;
  @State() password: string ;
  @State() user: string;
  cad() {
    
  }
  async handleSubmit(e) {
    e.preventDefault()
    const result = await ApiActions.cadUser(this.email,this.password,this.user)
    const resultJson = await result.json()
    if(result.status === 201){
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
            <br></br>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input type="text" value={this.user} onInput={(event) => this.handleChange('user', event)} id="login" class="fadeIn second" name="login" placeholder="Nome do usuario" />
              <input type="email" value={this.email} onInput={(event) => this.handleChange('email', event)} id="login" class="fadeIn second" name="login" placeholder="E-mail" />
              <input type="password" value={this.password} onInput={(event) => this.handleChange('password', event)} id="password" class="fadeIn third" name="login" placeholder="Senha" />
              <input type="submit" class="fadeIn fourth" value="Cadastrar" />
            

            <div id="formFooter">
              <br></br>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

}
