import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {ContratistaService} from '../../services/contratista.service';
import{ContratistaModel} from '../../models/contratista.model';
import{UsuarioModel} from '../../models/usuario.model';
import {ContratistaTipoTrabajoModel} from '../../models/contratistaTipoTrabajo.model';
import{UsuarioService} from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, MenuController, LoadingController } from '@ionic/angular';

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
    private _usuarioService:UsuarioService,
    private activatedRoute: ActivatedRoute) {
   }

  ngOnInit() {
    this.idusuario=this.activatedRoute.snapshot.params.idusuario;
      

    // this.Usuario=this._usuarioService.usuarioCompleto;
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
			plan_id: [2, Validators.required],
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

  guardarContratista(){
      //guarda el contratista
      console.log(this.prepareContratista());
      this._contratistaService.createContratista(this.prepareContratista()).subscribe((res:any)=>{
        //una vez guardado se guardan sus areas
      this.guardarAreas(res.id);
      console.log(res);
    },error=>{
      // swal('Error', 'Error al guardar contratista, por favor inténtelo nuevamente, error:'+error.message, 'warning');
      console.log(error);
    })
  }
  guardarAreas(idcontratista){
    // prepearar datos
    console.log(this.trabajosSelecionados);
    // let idsTrabajos:any []=[];
    // this.trabajosSelecionados.forEach(trabajo=>{
    //   idsTrabajos.push(trabajo.id);
    // })

    this._contratistaService.createContratistaTipoTrabajo(new ContratistaTipoTrabajoModel(idcontratista,this.trabajosSelecionados)).subscribe((res)=>{
          console.log(res);
          this.navCtrl.navigateRoot('/');
        },error=>{
          console.log(error);
        })  
  }
  agregarTrabajo(idtrabajo:number){
    this.trabajosSelecionados.push(idtrabajo);
  }
}
