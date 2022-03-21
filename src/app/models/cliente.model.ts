export interface Cliente{
  clienteID: number,
  nombre: string,
  apellido: string,
  nombreUsuario: string,
  contrasena: string,
  email: string,
  numeroContacto: string,
  direccion: string
}


export interface CrearCliente extends Omit<Cliente, 'clienteID'>{

}
