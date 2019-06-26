
export class UsuarioModel  {
    
    constructor(
        public api_token: string,
        public avatar:string,
        public created_at:string,
        public direccion:string,
        public email:string,
        public email_verified_at:string,
        public id: number,
        public name:string,
        public role_id:string,
        public settings:string,
        public telefono:string,
        public ubicacion:string,
        public updated_at:string,
        public username:string
    ) { }
}
