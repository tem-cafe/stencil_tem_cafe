/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  MatchResults,
  RouterHistory,
} from '@stencil/router';
import {
  loginAPiModel,
  temCafeApiModel,
} from './global/app';

export namespace Components {
  interface AppHome {
    'history': RouterHistory;
    'spinner': boolean;
    'toastMsg': string;
  }
  interface AppLogin {}
  interface AppProfile {
    'match': MatchResults;
  }
  interface AppRoot {
    'coffeState': temCafeApiModel;
    'coffeStateText': string;
    'user': loginAPiModel;
  }
  interface CadUser {}
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppLoginElement extends Components.AppLogin, HTMLStencilElement {}
  var HTMLAppLoginElement: {
    prototype: HTMLAppLoginElement;
    new (): HTMLAppLoginElement;
  };

  interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {}
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLCadUserElement extends Components.CadUser, HTMLStencilElement {}
  var HTMLCadUserElement: {
    prototype: HTMLCadUserElement;
    new (): HTMLCadUserElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-login': HTMLAppLoginElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'cad-user': HTMLCadUserElement;
  }
}

declare namespace LocalJSX {
  interface AppHome extends JSXBase.HTMLAttributes<HTMLAppHomeElement> {
    'history'?: RouterHistory;
    'spinner'?: boolean;
    'toastMsg'?: string;
  }
  interface AppLogin extends JSXBase.HTMLAttributes<HTMLAppLoginElement> {}
  interface AppProfile extends JSXBase.HTMLAttributes<HTMLAppProfileElement> {
    'match'?: MatchResults;
  }
  interface AppRoot extends JSXBase.HTMLAttributes<HTMLAppRootElement> {
    'coffeState'?: temCafeApiModel;
    'coffeStateText'?: string;
    'user'?: loginAPiModel;
  }
  interface CadUser extends JSXBase.HTMLAttributes<HTMLCadUserElement> {}

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-login': AppLogin;
    'app-profile': AppProfile;
    'app-root': AppRoot;
    'cad-user': CadUser;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


