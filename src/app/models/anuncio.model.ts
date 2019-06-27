export class AnuncioModel{
    constructor(
        public id:number,
        public contratista_id:number,
        public tipotrabajo_id:number,
        public titulo:string,
        public imagen:string,
        public descripcion:string,
        public aprobado:number
    ) { }
}