import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { SolicitudOferta, Oferta, AceptOferta } from '../models/oferta.model';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  private api_url: string = 'http://localhost:8090/servi-todo/oferta';

  constructor(
    private http: HttpClient
  ) { }

  registar(oferta: SolicitudOferta){
    return this.http.post<Oferta>(`${this.api_url}/registrar`, oferta)
    .subscribe(data => console.log(data)
    );
  }

  ofertasHacedores(){
    return this.http.get<Oferta[]>(`${this.api_url}/ofertaHacedores`);
  }

  aceptarSolicitud(aceptOfert: AceptOferta, ofertaID: number){
    this.http.put<Oferta>(`${this.api_url}/aceptar/${ofertaID}`, aceptOfert)
    .subscribe(data => console.log(data)
    )
  }

  ofertasAceptadas(){
    return this.http.get<Oferta[]>(`${this.api_url}/ofertasAceptadas`);
  }
}
