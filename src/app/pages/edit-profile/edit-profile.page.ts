import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {UsuarioModel} from '../../models/usuario.model';
import{UsuarioService} from '../../services/usuario.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  usuario:UsuarioModel;
  usuarioForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private _usuarioService:UsuarioService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.usuario=this._usuarioService.obtenerUsuario();
    this.initForm();
  }
  get f() { return this.usuarioForm.controls; }
  initForm(){
    this.usuarioForm = this.formBuilder.group({
      'name': [this.usuario.name, Validators.compose([
        Validators.required
      ])],
      'email': [this.usuario.email, Validators.compose([
        Validators.required,Validators.email
      ])],
      'username': [this.usuario.username, Validators.compose([
        Validators.required
      ])],
      'direccion': [this.usuario.direccion, Validators.compose([
        Validators.required
      ])],
      'telefono': [this.usuario.telefono, Validators.compose([
        Validators.required,Validators.maxLength(10),
				Validators.minLength(7),  Validators.pattern("^[0-9]*$")
      ])]
    })
  }

  prepareData(){
    const controls =this.usuarioForm.controls;
    this.usuario.name=controls['name'].value;
    this.usuario.email=controls['email'].value;
    this.usuario.username=controls['username'].value;
    this.usuario.direccion=controls['direccion'].value;
    this.usuario.telefono=controls['telefono'].value;
  }

  async sendData() {
    const loader = await this.loadingCtrl.create();
    loader.present();
    this.prepareData();
    this._usuarioService.actualizarUsuario(this.usuario).subscribe(res=>{
      loader.dismiss(true);

    },err=>{
      loader.dismiss(false);
      alert("Ha ocurrido un error vuelva a intentarlo")
    })

    
    loader.onWillDismiss().then(async l => {
      if(l){
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          cssClass: 'bg-profile',
          message: 'Datos actualizados correctamente!',
          duration: 3000,
          position: 'bottom'
        });
  
        toast.present();
        this.navCtrl.navigateForward('/home-results');
      }
    });
  }

}
