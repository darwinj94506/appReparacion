import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import {
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  LoadingController,
   } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { MapPage } from './../../modal/map/map.page';
import { ContratistaService } from 'src/app/services/contratista.service';
import { ContratoModel } from 'src/app/models/contrato.model';

@Component({
  selector: 'app-image',
  templateUrl: './image.page.html',
  styleUrls: ['./image.page.scss'],
})
export class ImagePage implements OnInit {
  @Input() value: any;
  public image: any;
  imagen="themeCover";
  estadoEnprogreso:boolean=false;
  estadoTerminado:boolean=false;
  precio = new FormControl();
  contrato:any;
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public _contratistaService:ContratistaService
  ) {}

  ngOnInit() {
   
    this.precio.setValue(this.value.costo);
    console.log(this.value);
    this.contrato={...this.value};
    delete this.contrato.user;
    delete this.contrato.updated_at;
    delete this.contrato.created_at;
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl("http://reformasbaratascordoba.es/wp-content/uploads/2018/06/plato-ducha-ceramica-reforma-cordoba.jpg");
    console.log(this.contrato);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  cambiarARechazado($event){
    this.contrato.estado_id=4;
    this._contratistaService.updateContrato(this.contrato).subscribe(res=>{
      console.log(res);
      this.modalCtrl.dismiss(true);
    })

  }
  cambiarATerminado($event){ 
    this.contrato.estado_id=3;
    console.log(this.contrato);    
    this._contratistaService.updateContrato(this.contrato).subscribe(res=>{
      console.log(res);
      this.modalCtrl.dismiss(true);
    })
  }
  async presentUbicacion() {
    console.log(this.value.ubicacion);
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: { value: this.value.ubicacion }
    });
    await modal.present();
  }

  async sendData(){    
    console.log(this.contrato);    
    this.contrato.costo=this.precio.value;
    console.log(this.contrato);    
    this._contratistaService.updateContrato(this.contrato).subscribe(res=>{
      console.log(res);
      this.modalCtrl.dismiss(true);
    })

  }


}
