import { Injectable } from '@angular/core';
import{environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import{UsuarioService} from './usuario.service';
import { forkJoin } from 'rxjs';
import { ContratistaTipoTrabajoModel } from '../models/contratistaTipoTrabajo.model';
import { Observable, BehaviorSubject, from } from 'rxjs';
const URL=environment.url;

@Injectable({
  providedIn: 'root'
})
export class ContratistaService {
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$: Observable<boolean>;

  constructor(private http: HttpClient, private _usuarioService:UsuarioService)  {
   }

	createContratista(contratista): Observable<any> {
		console.log(contratista);
		// const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'contratista', contratista);
	}
	
	//maestro detalle entre contratista  tipo de trabajo
	createContratistaTipoTrabajo(contratistaTipoTrabajoModel:ContratistaTipoTrabajoModel): Observable<any> {
		// const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'contratista-addTrabajo', contratistaTipoTrabajoModel);
	}

	getPlanes():Observable<any>{
		return this.http.get<any>(URL+'plan');
	}

	getTiposTrabajo():Observable<any>{
		return this.http.get<any>(URL+'tipotrabajo');
	}

	//logica de update contratista
	getContratistaLogueado():Observable<any>{
		return this.http.get<any>(URL+`userap?api_token=`+this._usuarioService.datosUsuario.api_token);
	}

	updateContratistaTipoTrabajo(contratistaTipotrabajo:ContratistaTipoTrabajoModel): Observable<any> {
		//const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.post<any>(URL+'contratista-addTrabajo', contratistaTipotrabajo);
	}

	updateContratista(contratista): Observable<any> {
		console.log(contratista);
		// const httpHeaders = this.httpUtils.getHTTPHeaders();
		return this.http.put<any>(URL+'contratista/'+contratista.id, contratista);
	}
	contratosContratistas( id ){
		let url = URL+'contratista-contratos-user/'+id;
		return this.http.get(url);	
	}
	//para actualizar el estado del contrato
	updateContrato( contrato ){
		let url = URL+'contrato/edit/'+contrato.id;
		return this.http.post(url,contrato);	
	}




}
