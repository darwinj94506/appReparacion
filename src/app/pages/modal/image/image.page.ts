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

import { MapPage } from './../../modal/map/map.page';

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

  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private sanitizer: DomSanitizer,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    console.log(this.value);
    // this.value.foto
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl("http://reformasbaratascordoba.es/wp-content/uploads/2018/06/plato-ducha-ceramica-reforma-cordoba.jpg");
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  cambiarAEnprogreso($event){
    console.log("cambia en progreso")
    this.modalCtrl.dismiss(true);

  }
  cambiarATerminado($event){
    console.log("cambia a terminado")
    this.modalCtrl.dismiss(true);
  }
  async presentUbicacion(contrato: any) {
    const modal = await this.modalCtrl.create({
      component: MapPage,
      componentProps: { value: contrato }
    });
    await modal.present();
  }


}
