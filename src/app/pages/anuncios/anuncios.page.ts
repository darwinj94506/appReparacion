import { Component, OnInit } from '@angular/core';
import {AnuncioService} from '../../services/anuncio.service';
import {AnuncioModel} from '../../models/anuncio.model';
import {UsuarioService} from '../../services/usuario.service';
import {ContratistaService} from '../../services/contratista.service';
import {CrudAnuncioPage} from '../modal/crud-anuncio/crud-anuncio.page';
import{environment} from '../../../environments/environment';


import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  LoadingController,
  ModalController } from '@ionic/angular';
  import { ImagePage } from './../modal/image/image.page';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.page.html',
  styleUrls: ['./anuncios.page.scss'],
})
export class AnunciosPage implements OnInit {
  anuncios:any[]=[];
  anunciosFiltrados:any[]=[];
  filtro:number=0;
  contratistaId:number=0;
  URL_IMAGEN=environment.urlImg;
  
  constructor(private _anuncioService:AnuncioService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private _usuarioService:UsuarioService,
    private _contratistaService:ContratistaService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.cargarAnuncios(this.filtro);
 
  }
  
  
  async cargarAnuncios(filtro:number){
    const loader = await this.loadingCtrl.create({
      message: 'Por favor espere...',
      spinner:'circles'
    });
    loader.present();
    this._contratistaService.getContratistaLogueado().subscribe(res=>{
      this.contratistaId=res.contratista[0].id;
      this._anuncioService.getAnunciosContratista(this.contratistaId).subscribe((res:any)=>{
        this.anuncios=res.anuncios;
        this.anunciosFiltrados=this.anuncios.filter(anuncio=>anuncio.aprobado==filtro);
        loader.dismiss(true);
      })
    },error=>{
      alert("A ocurrido un error vuelva a intentarlo");
      loader.dismiss(false);
    })
  }

  async presentAnuncio(anuncio: AnuncioModel) {
    if(!anuncio){
      anuncio=new AnuncioModel(0,this.contratistaId,1,'','nueva-imagen','',0);
    }
    const modal = await this.modalCtrl.create({
      component: CrudAnuncioPage,
      componentProps: { anuncio: anuncio }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if(data){
      this.cargarAnuncios(this.filtro);
    }
  }

  segmentChanged(ev: any) {
    if(ev.detail.value=="pendientes"){
      this.filtro=0;
      this.anunciosFiltrados=this.anuncios.filter(anuncio=>anuncio.aprobado==0)
    } 
    else if(ev.detail.value=="aprobados"){
      this.filtro=1;
      this.anunciosFiltrados=this.anuncios.filter(anuncio=>anuncio.aprobado==1)
    }
  }
}
