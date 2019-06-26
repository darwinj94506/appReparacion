import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {ContratistaService} from '../../services/contratista.service';
import{ContratistaModel} from '../../models/contratista.model';
import{UsuarioModel} from '../../models/usuario.model';
import {ContratistaTipoTrabajoModel} from '../../models/contratistaTipoTrabajo.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, MenuController, LoadingController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-create-contratista',
  templateUrl: './create-contratista.page.html',
  styleUrls: ['./create-contratista.page.scss'],
})
export class CreateContratistaPage implements OnInit {
  usuarioCompleto:UsuarioModel;
  contratistaForm:FormGroup;
  arrayPlanes:any[]=[];
  arrayTiposTrabajo:any[]=[];
  trabajosSelecionados: any[] = [];
  // Usuario:UsuarioModel;
  idusuario:number;

  constructor(private _formBuilder: FormBuilder,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private _contratistaService:ContratistaService,
    public toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.idusuario=this.activatedRoute.snapshot.params.idusuario;
    this.createForm();
    this.getPlanes();
    this.getTipoTrabajo();
  }

  //******** valores necesarios para registro ******************
  getPlanes(){
    this._contratistaService.getPlanes().subscribe(res=>{
      this.arrayPlanes=res;
      console.log(this.arrayPlanes);
    },error=>{
      // swal('Error', 'Error al obtener los planes, por favor recarge nuevamente la página, error:'+error.message, 'warning');
    })
  }
  
  getTipoTrabajo(){
    this._contratistaService.getTiposTrabajo().subscribe(res=>{
      this.arrayTiposTrabajo=res;
      console.log(this.arrayTiposTrabajo);
    },error=>{
      // swal('Error', 'Error al obtener los trabajos, por favor recarge nuevamente la página, error:'+error.message, 'warning');
    })
  } 

  get f() { return this.contratistaForm.controls; }

	createForm() {
		this.contratistaForm = this._formBuilder.group({
			plan_id: [1, Validators.required],
			descripcion:['',[Validators.required,Validators.maxLength(255)]]
		});
  }
  
  prepareContratista(): ContratistaModel {
		const controls = this.contratistaForm.controls;
		const _contratista = new ContratistaModel();
		_contratista.plan_id = controls['plan_id'].value;
    _contratista.descripcion = controls['descripcion'].value;
    _contratista.user_id = this.idusuario;
		return _contratista;
	}

  //crear nuevo contratista
  onSumit(){
    this.guardarContratista()
  }

  async guardarContratista(){
    const loader = await this.loadingCtrl.create();
    loader.present();
    console.log(this.prepareContratista());
    this._contratistaService.createContratista(this.prepareContratista()).subscribe((res:any)=>{
      //una vez guardado se guardan sus areas
      this.guardarAreas(res.id,loader);
      },error=>{
        loader.dismiss(false);
        console.log(error);
      })
  }
  guardarAreas(idcontratista,loader){
    
    this._contratistaService.createContratistaTipoTrabajo(new ContratistaTipoTrabajoModel(idcontratista,this.trabajosSelecionados)).
      subscribe((res)=>{
          console.log(res);
          loader.dismiss(true);
        },error=>{
          loader.dismiss(false);
        })  
        loader.onWillDismiss().then(async l => {
          if(l){
            const toast = await this.toastCtrl.create({
              showCloseButton: true,
              cssClass: 'bg-profile',
              message: 'Datos guardados correctamente',
              duration: 3000,
              position: 'bottom'
            });
      
            toast.present();
            this.navCtrl.navigateRoot('/');
          }
        });
  }
  agregarTrabajo(idtrabajo:number){
    this.trabajosSelecionados.push(idtrabajo);
  }
}
