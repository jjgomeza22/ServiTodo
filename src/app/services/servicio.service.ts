import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Servicio } from '../models/servicio.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private api_url: string = 'http://localhost:8090/servi-todo/servicio';

  constructor(
    private http: HttpClient
  ) { }

  servicios(){
    return this.http.get<Servicio[]>(`${this.api_url}/consultar`);
  }

}
