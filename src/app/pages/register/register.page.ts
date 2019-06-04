import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import{environment} from '../../../environments/environment';
import{UsuarioService} from '../../services/usuario.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario:FormGroup;
  contratista:FormGroup;

  public onRegisterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private _usuarioService:UsuarioService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
   this.initForm()
  }

  initForm(){
    this.onRegisterForm = this.formBuilder.group({
      'name': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])],
      'username': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
    // const loader = await this.loadingCtrl.create({
    //   duration: 2000
    // });
    // loader.present(); 
    this._usuarioService.crearUsuario(this.onRegisterForm.value).subscribe((res:any)=>{
      this.navCtrl.navigateRoot('/create-contratista/'+res.id);
    },error=>{
      alert("Ha ocurrido un error, vuelva a intentarlo");
    // loader.dismiss()
    })

    
    // loader.onWillDismiss().then(() => {
    //   // this.navCtrl.navigateRoot('/home-results');
    //    this.navCtrl.navigateRoot('/create-contratista');
    // });
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
