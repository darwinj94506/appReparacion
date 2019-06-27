import { Component } from '@angular/core';

import { Platform, NavController,LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UsuarioService} from './services/usuario.service';
import {UsuarioModel} from './models/usuario.model';

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public Usuario:UsuarioModel;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public _usuarioService:UsuarioService
  ) {
    this.appPages = [
      {
        title: 'Inicio',
        url: '/home-results',
        direct: 'root',
        icon: 'home'
      },
      {
        title: 'Información',
        url: '/about',
        direct: 'forward',
        icon: 'information-circle-outline'
      },

      {
        title: 'App Settings',
        url: '/settings',
        direct: 'forward',
        icon: 'cog'
      },
      {
        title: 'Anuncios',
        url: '/anuncios',
        direct: 'forward',
        icon: 'cog'
      }
    ];

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    }).catch(() => {});
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  async logout() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    this._usuarioService.logoutUsuario().subscribe(res=>{
      loader.dismiss();
      this.navCtrl.navigateRoot('/');
    },error=>{
      loader.dismiss();
      alert("Ha ocurrido un error vuela a intentarlo");
    })
    
  }
}
