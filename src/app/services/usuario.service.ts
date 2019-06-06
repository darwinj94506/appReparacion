import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { RegistroModel } from '../models/registro.model';
import { LoginModel } from '../models/login.model';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { Subject } from 'rxjs';
const URL=environment.url;
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioSubject = new BehaviorSubject<UsuarioModel>(null);
  usuario$: Observable<UsuarioModel>;
  datosUsuario:UsuarioModel;  
  constructor(public http: HttpClient) {
    this.usuario$=this.usuarioSubject.asObservable();
    this.obtenerUsuario();
    this.usuario$.subscribe(datos=>{
      // console.log(datos);
      this.datosUsuario=datos
    });
   }
   obtenerUsuario():UsuarioModel{
    let usuario:UsuarioModel=JSON.parse(localStorage.getItem('usuario1'));
    this.usuarioSubject.next(usuario);
    return usuario;
	}

   guardarStorage( usuario: UsuarioModel ) {
		console.log(usuario);
		localStorage.setItem('usuario1', JSON.stringify(usuario) );
		this.usuarioSubject.next(usuario);
    } 
    
    borrarStorage() {
      //El modelo usuario se iguala a null para que no quede cargado los datos
      this.usuarioSubject.next(null);
      //Elimina el usuario del localstorage(almacenamiento local),elimina un elemento por clave de LocalStorage
      localStorage.removeItem('usuario1');
      }

    login( usuario:LoginModel ){
      let url = URL+'loginAPI';
      return this.http.post(url, usuario)
        .pipe(map( (resp: any) => {
            console.log(resp);
            if(resp.failed){
              return false
            }else{
              this.guardarStorage( resp );
              this.usuarioSubject.next(resp);
              return true;
            }
            // console.log(resp);
            // if(resp.id!=undefined){
              
            // }else{
            //   return false
            // }          
          }))
    }
    crearUsuario( usuario:RegistroModel ){
      let url = URL+'userap';
      //se regresara un observado para poder suscribir la peticion
      return this.http.post(url,usuario);
    }
      
    actualizarUsuario( usuario:UsuarioModel ){
      let url = URL+'user/edit-userap?api_token='+usuario.api_token;	
      return this.http.put(url, usuario).pipe(map( (resp: any) => {
        this.guardarStorage( resp );
        this.usuarioSubject.next(resp);
        }));
    }

    logoutUsuario(){
      let url = URL+'logoutAPI?api_token='+this.datosUsuario.api_token;
      //realiza la peticion map recibe la respuesta
      this.usuarioSubject.next(null);
      return this.http.get(url).pipe(map(resp => {
        this.borrarStorage();
      }))
    }
    
  
}
