
import {ContratistaModel} from './contratista.model';
import { tipoTrabajoModel } from './tipoTrabajo.model';
export class ContratistaTipoTrabajoModel  {

    contratista_id:number;
    tipotrabajo_id:number [];

constructor(contratista_id:number,tipoTrabajo_id:number []){
    this.contratista_id=contratista_id;
    this.tipotrabajo_id=tipoTrabajo_id;
}

   
}





// Contratista:ContratistaModel;
// Trabajos:tipoTrabajoModel[];

// constructor(contratista:ContratistaModel,trabajos:tipoTrabajoModel[]){
//     this.Contratista=contratista;
//     this.Trabajos=trabajos;
// }