import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true
})
export class AppProfile {
  @Prop() match: MatchResults;

  normalize(name: string): string {
    switch (+name) {
      case 1:
        return "Tem"
        break;
      case 2:
return "Não tem"
        break;
      case 3:
      return "Você ta fazendo o"
        break;
      default:
        break;
    }
  }

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div class="app-profile">
          <p>
            Blz, registramos que {this.normalize(this.match.params.name)} café. vlw 
          </p>
        </div>
      );
    }
  }
}
