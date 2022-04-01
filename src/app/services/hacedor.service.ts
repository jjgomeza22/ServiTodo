import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CrearHacedor, DetallesH, Hacedor } from '../models/hacedor.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HacedorService {

  private api_url: string = 'http://localhost:8090/servi-todo/hacedor';

  hacedor: Hacedor = {
    hacedorID: 0,
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    email: '',
    numeroContacto: '',
    direccion: '',
    disponibilidad: false,
    rangoTrabajo: '',
    habilidades: [
      {
        hacedorID: 0,
        habilidadID: 0
      },
    ]
  }

  private sendHacedor = new BehaviorSubject<Hacedor>({
    hacedorID: 0,
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    email: '',
    numeroContacto: '',
    direccion: '',
    disponibilidad: false,
    rangoTrabajo: '',
    habilidades: [
      {
        hacedorID: 0,
        habilidadID: 0
      },
    ]
  });

  sendHacedor$ = this.sendHacedor.asObservable();

  constructor(
    private http: HttpClient
    ) { }

    login(email: string){
      return this.http.get<Hacedor>(`${this.api_url}/auth?email=${email}`)
      .pipe(
        map(data => {
          this.sendHacedor.next(data);
          this.hacedor = data;
          return data;
        })
      );
    }

    registrar(newHacedor: CrearHacedor){
      return this.http.post<Hacedor>(`${this.api_url}/registrar`, newHacedor)
      .subscribe(data => data //console.log(data)
      );
    }

    registrarDetalles(detalles: DetallesH, hacedorID: number){
      return this.http.put<Hacedor>(`${this.api_url}/registrarDetalles/${hacedorID}`, detalles)
      .subscribe(data => data //console.log(data)
      )
    }

    consultarHacedores(){
      return this.http.get<Hacedor[]>(`${this.api_url}/consultar`);
    }

}
