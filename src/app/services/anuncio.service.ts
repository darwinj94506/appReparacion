import { Injectable } from '@angular/core';
import{ environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ AnuncioModel } from '../models/anuncio.model';
import{ ContratistaService } from './contratista.service';

import { Observable } from 'rxjs';
const URL=environment.url;

@Injectable({
  providedIn: 'root'
})
export class AnuncioService {

  constructor(private http: HttpClient, private _usuarioService:ContratistaService) { }

  getAnuncios():Observable<any>{
    return this.http.get<any>(URL+'anuncio');
  }
  getAnunciosContratista(id):Observable<any>{
    return this.http.get<any>(URL+'contratista-anuncios/'+id);
  }

  subirFoto(anuncio:FormData,id):Observable<any>{
    let url = URL+'anuncio/edit-anunciophoto/'+id;	
    return this.http.post<any>(url, anuncio)

  }
  
  createAnuncio(anuncio:AnuncioModel):Observable<any>{
		return this.http.post<any>(URL+'anuncio', anuncio);
  }

  deleteAnuncio(anuncio:AnuncioModel):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: anuncio
    };
		return this.http.delete<any>(URL+'anuncio', httpOptions);
  }

  editAnuncio(anuncio:AnuncioModel):Observable<any>{
		return this.http.post<any>(URL+'anuncio/edit/'+anuncio.id, anuncio);
  }

  // editAnuncioPhoto(anuncio:AnuncioModel):Observable<any>{
	// 	return this.http.post<any>(URL+'anuncio/edit/'+anuncio.id, anuncio);
  // }

}
