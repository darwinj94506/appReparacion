import { Component, OnInit,Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  LoadingController,
   } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { AnuncioService } from 'src/app/services/anuncio.service';
import { AnuncioModel } from 'src/app/models/anuncio.model';

@Component({
  selector: 'app-crud-anuncio',
  templateUrl: './crud-anuncio.page.html',
  styleUrls: ['./crud-anuncio.page.scss'],
})
export class CrudAnuncioPage implements OnInit {

  anuncioForm:FormGroup;
  imagen:string="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png";

  @Input() anuncio: AnuncioModel;

  constructor( public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private _anuncioService:AnuncioService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.initForm();
  }

  get f() { return this.anuncioForm.controls; }

  initForm(){
    if(this.anuncio.id==0){
      this.imagen="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"
    }else{
      this.imagen="http://localhost/reparaccion/public/storage/"+this.anuncio.imagen;
    }
    this.anuncioForm = this.formBuilder.group({
      'titulo': [this.anuncio.titulo, Validators.compose([
        Validators.required
      ])],
      'descripcion': [this.anuncio.descripcion, Validators.compose([
        Validators.required,Validators.email])]
    })
  }

  prepareData(){
    const controls =this.anuncioForm.controls;
    this.anuncio.titulo=controls['titulo'].value;
    this.anuncio.descripcion=controls['descripcion'].value;
   
  }
  
  closeModal() {
    this.modalCtrl.dismiss();
  }

  async sendData() {
    const loader = await this.loadingCtrl.create({
      message: 'Por favor espere...',
      spinner:'circles'
    });
    loader.present();
    this.prepareData();
    if(this.anuncio.id==0){//nuevo
      this._anuncioService.createAnuncio(this.anuncio).subscribe(res=>{
      const f = new FormData();
      f.append('imagen', this.imagenSeleccionada);
        this._anuncioService.subirFoto(f,res.id).subscribe(res=>{
          console.log(res);
          loader.dismiss(true);
          this.modalCtrl.dismiss(true);

        },err=>{
          console.log(err);
          alert("error");
          loader.dismiss(false);
          this.modalCtrl.dismiss(false);
        })
        
  
      },err=>{
        console.log(err);
         loader.dismiss(false);
        alert("Ha ocurrido un error vuelva a intentarlo")
      })

    }else{//editar
      this._anuncioService.editAnuncio(this.anuncio).subscribe(res=>{
        loader.dismiss(true);
        this.modalCtrl.dismiss(true);
      },err=>{
        console.log(err);
        loader.dismiss(false);
        alert("Ha ocurrido un error vuelva a intentarlo")
      })

    }
    
    loader.onWillDismiss().then(async l => {
      console.log(l);
      if(l.data){
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          cssClass: 'bg-profile',
          message: 'Operación realizada correctamente!',
          duration: 3000,
          position: 'bottom'
        });
  
        toast.present();
      }
    });
  }
  imagenSeleccionada:any;

  onSelectFile(event) {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      this.imagenSeleccionada=event.target.files[0];
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagen = event.target.result;
      }
    }
  }

  

}
