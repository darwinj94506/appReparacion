import { Component, OnInit, ViewChild, ElementRef,Input } from '@angular/core';
import { LoadingController, ToastController,Platform, ModalController } from '@ionic/angular';

// declare var google;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @Input() value: any;
  lat: number = 51.678418;
  lng: number = 7.809007;
  loading: any;
  ubicacion:any;
  constructor(public loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    public toastCtrl: ToastController,private platform: Platform) { }

  async ngOnInit() {
    this.ubicacion=JSON.parse(this.value);
    console.log(this.ubicacion);
    this.lat=this.ubicacion.lat;
    this.lng=this.ubicacion.lng;

  }
    
  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }


}
