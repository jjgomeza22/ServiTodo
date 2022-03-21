import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { EnvHabilidad, Habilidad } from '../models/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HacedorHabilidadService {

  private api_url: string = 'http://localhost:8090/servi-todo/hacedorHabilidad';

  constructor(
    private http: HttpClient
  ) { }

  registrar(habilidad: EnvHabilidad){
    return this.http.post<EnvHabilidad>(`${this.api_url}/registrar`, habilidad)
    .subscribe(data => console.log(data));
  }
}
