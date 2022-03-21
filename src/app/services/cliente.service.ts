import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Cliente, CrearCliente } from '../models/cliente.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private cliente: Cliente = {
    clienteID: 0,
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    direccion: '',
    email: '',
    numeroContacto: ''
  }

  private sendCliente = new BehaviorSubject<Cliente>({
    clienteID: 0,
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    direccion: '',
    email: '',
    numeroContacto: ''
  });

  sendCliente$ = this.sendCliente.asObservable();

  // private api_url: string = `${environment.API_URL}/servi-todo/cliente`;
  private api_url: string = 'http://localhost:8090/servi-todo/cliente';

  constructor(private http: HttpClient) { }

  login(email: string){
    return this.http.get<Cliente>(`${this.api_url}/auth?email=${email}`)
    .pipe(
      map(data => {
        this.sendCliente.next(data);
        return data;
      })
    );
  }

  registrar(newCliente: CrearCliente){
    return this.http.post<Cliente>(`${this.api_url}/registrar`, newCliente)
    .subscribe(data => console.log(data)
    );
  }
}
