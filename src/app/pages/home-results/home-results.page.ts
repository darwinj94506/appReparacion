import { Component,OnInit } from '@angular/core';
import {ContratistaService} from '../../services/contratista.service';
import {UsuarioService} from '../../services/usuario.service';

import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  LoadingController,
  ModalController } from '@ionic/angular';

// Modals
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';
import { ImagePage } from './../modal/image/image.page';
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from './../../components/notifications/notifications.component';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss']
})
export class HomeResultsPage implements OnInit{
  searchKey = '';
  yourLocation = '123 Test Street';
  themeCover = 'assets/img/ionic4-Start-Theme-cover.jpg';
  contratos:any[]=[];
  contratosFiltrados:any=[];
  filtro:number=1;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private _contratistaService:ContratistaService,
    private _usuarioService:UsuarioService,
    public loadingCtrl: LoadingController
  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
  ngOnInit(){
    this.cargarContratos(this.filtro);
   
  }
  async cargarContratos(filtro:number){
    const loader = await this.loadingCtrl.create({
      message: 'Por favor espere...',
      spinner:'circles'
    });
    loader.present();
    this._contratistaService.getContratistaLogueado().subscribe(res=>{
      console.log(res);
      this._contratistaService.contratosContratistas(res.contratista[0].id).subscribe((res:any)=>{
        console.log(res);
        this.contratos=res.contratos;
        this.contratosFiltrados=this.contratos.filter(contrato=>contrato.estado_id==filtro);
        loader.dismiss(true);
      },error=>{
        alert("A ocurrido un error vuelva a intentarlo");
        loader.dismiss(false);
      })
    },error=>{
      alert("A ocurrido un error vuelva a intentarlo");
      loader.dismiss(false);
    })
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async presentContrato(contrato: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: contrato }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if(data){
      this.cargarContratos(this.filtro);
    }
    console.log(data);
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  segmentChanged(ev: any) {
    if(ev.detail.value=="pendientes"){
      this.filtro=1;
      this.contratosFiltrados=this.contratos.filter(contrato=>contrato.estado_id==1)
    } 
    else if(ev.detail.value=="progreso"){
      this.filtro=2;
      this.contratosFiltrados=this.contratos.filter(contrato=>contrato.estado_id==2)
    }
    else if(ev.detail.value=="terminadas"){
      this.filtro=3;
      this.contratosFiltrados=this.contratos.filter(contrato=>contrato.estado_id==3)
    }
      
  }
    
    

}
