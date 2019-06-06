import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import{environment} from '../../../environments/environment';
import{UsuarioService} from '../../services/usuario.service';
import { MustMatch } from './_helpers/must-match.validator';
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
      'confirmPassword': [null, Validators.compose([
        Validators.required
      ])],
      'username': [null, Validators.compose([
        Validators.required
      ])]
    },{
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  async signUp() {
    const loader = await this.loadingCtrl.create();
    loader.present(); 
    let usuario = this.onRegisterForm.value;
    delete usuario.confirmPassword;

    this._usuarioService.crearUsuario(usuario).subscribe((res:any)=>{
      loader.dismiss();
      this.navCtrl.navigateRoot('/create-contratista/'+res.id);
    },error=>{
      alert("Ha ocurrido un error, vuelva a intentarlo");
      loader.dismiss();
    })
    

  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
