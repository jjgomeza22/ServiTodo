import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Habilidad } from '../models/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  habilidads: Habilidad[] = [{
    habilidadID: 0,
    nombre: '',
    descripcion: ''
  }];

  private api_url: string = 'http://localhost:8090/servi-todo/habilidad';

  constructor(
    private http: HttpClient
  ) { }

  consultar(){
    return this.http.get<Habilidad[]>(`${this.api_url}/consultar`);
  }
}
