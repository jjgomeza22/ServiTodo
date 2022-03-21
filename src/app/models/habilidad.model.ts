export interface Habilidad{
  habilidadID: number,
  nombre: string,
  descripcion: string
}

export interface EnvHabilidad{
  hacedorID: number | undefined,
  habilidadID: number
}
