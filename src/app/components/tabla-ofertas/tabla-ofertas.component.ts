import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Hacedor } from 'src/app/models/hacedor.model';
import { AceptOferta, Oferta } from 'src/app/models/oferta.model';
import { Servicio } from 'src/app/models/servicio.model';
import { HacedorService } from 'src/app/services/hacedor.service';
import { ServicioService } from 'src/app/services/servicio.service';
import {OfertaService} from '../../services/oferta.service'

@Component({
  selector: 'app-tabla-ofertas',
  templateUrl: './tabla-ofertas.component.html',
  styleUrls: ['./tabla-ofertas.component.scss']
})
export class TablaOfertasComponent implements OnInit {

  ofertas: Oferta[] = [];
  servicios: Servicio[] = [];
  ofertasMos: any[] = [];
  hacedorID: number = 0;

  constructor(
    private ofertaService: OfertaService,
    private servicioService: ServicioService,
    private hacedorService: HacedorService
  ) { }

  ngOnInit(): void {
    this.traerOfertas();
    this.traerServicios();
    this.enviarHacedor();
  }
  traerOfertas(){
    this.ofertaService.ofertasHacedores()
    .subscribe(data => {
      this.ofertas = data;
      // console.log(this.ofertas);

    });
  }

  traerServicios(){
    this.servicioService.servicios()
    .subscribe(data => {
      this.servicios = data;
      // console.log(this.servicios);
      this.findServiciosById();
    });
  }

  findServiciosById(){
    this.ofertas.forEach(oferta => {
      const change = this.servicios.find(servicio => servicio.servicioID === oferta.servicioID);
      this.ofertasMos.push({
        nombre: change?.nombre,
        descripcion: change?.descripcion,
        ofertaID: oferta.ofertaID
      })
      // console.log(change?.nombre);
    });
    // const servicio =  this.servicios.find(servicio => servicio.servicioID === )
  }

  enviarHacedor(){
    this.hacedorService.sendHacedor$.subscribe(data => {
      this.hacedorID = data.hacedorID;
      console.log(data);
    });
  }

  aceptarOferta(ofertaID: number){
    const aceptOfert: AceptOferta = {
      hacedorID: this.hacedorID,
      aceptado: true
    }
    console.log(aceptOfert);

    this.ofertaService.aceptarSolicitud(aceptOfert, ofertaID);
  }
}
