import { Usuario } from './usuario.model';

export interface ContactoProfesional {
    id: number;
    idUsuario: Usuario;
    idProfesional: Usuario;
    estado: string;
}
