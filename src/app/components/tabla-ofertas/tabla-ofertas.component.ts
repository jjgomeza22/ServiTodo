import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  hacedorID: any = 0;

  constructor(
    private ofertaService: OfertaService,
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.traerOfertas();
    this.traerServicios();
    // this.findServiciosById();
    this.hacedorID = this.activatedRoute.snapshot.queryParamMap.get("hacedorID");
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
        ofertaID: oferta.ofertaID,
        precio: oferta.precio
      })
    });
  }

  aceptarOferta(ofertaID: number){
    const aceptOfert: AceptOferta = {
      hacedorID: this.hacedorID,
      aceptado: true
    }
    // console.log(aceptOfert);

    this.ofertaService.aceptarSolicitud(aceptOfert, ofertaID);
    const ofertaDelete = this.ofertasMos.findIndex(oferta => oferta.ofertaID === ofertaID);
    this.ofertasMos.splice(ofertaDelete, 1);
  }

  rechazarOferta(ofertaID: number){
    const ofertaDelete = this.ofertasMos.findIndex(oferta => oferta.ofertaID === ofertaID);
    this.ofertasMos.splice(ofertaDelete, 1);
  }
}
