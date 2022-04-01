export interface Hacedor{
  hacedorID: number,
  nombre: string,
  apellido: string,
  nombreUsuario: string,
  contrasena: string,
  email: string,
  numeroContacto: string,
  direccion: string,
  disponibilidad: boolean,
  rangoTrabajo: string,
  habilidades: [
    {
    hacedorID: number,
    habilidadID: number
    }
  ]
}

export interface CrearHacedor extends Omit<Hacedor, 'hacedorID' | 'habilidades'>{

}

export interface DetallesH{
  numeroContacto: string,
  rangoTrabajo: string
}
