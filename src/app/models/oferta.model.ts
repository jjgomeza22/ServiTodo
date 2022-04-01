export interface Oferta{
  ofertaID: number,
  clienteID: number,
  hacedorID: number | null,
  servicioID: number,
  direccion: string,
  habilitado: boolean,
  aceptado: boolean | null
  fecha: Date,
  precio: number
}

export interface SolicitudOferta extends Omit<Oferta, 'ofertaID' | 'hacedorID' | 'aceptado'>{
  clienteID: number,
  servicioID: number,
  direccion: string,
  habilitado: boolean,
  fecha: Date,
  precio: number
}

export interface OfertasAcep{
  nombre: string,
  descripcion: string,
  ofertaID: number,
  precio: number,
  aceptada: boolean
}

export interface AceptOferta{
  hacedorID: number,
  aceptado: boolean
}
