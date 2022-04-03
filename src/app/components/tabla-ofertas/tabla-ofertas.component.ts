import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AceptOferta, Oferta } from 'src/app/models/oferta.model';
import { Servicio } from 'src/app/models/servicio.model';
import { HacedorService } from 'src/app/services/hacedor.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { OfertaService } from '../../services/oferta.service'

@Component({
  selector: 'app-tabla-ofertas',
  templateUrl: './tabla-ofertas.component.html',
  styleUrls: ['./tabla-ofertas.component.scss']
})
export class TablaOfertasComponent implements OnInit, AfterContentInit {

  ofertas: Oferta[] = [];
  servicios: Servicio[] = [];
  ofertasMos: any[] = [];
  hacedorID: any = 0;

  constructor(
    private ofertaService: OfertaService,
    private servicioService: ServicioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.traerOfertas();
    // this.traerServicios();
    // this.hacedorID = this.activatedRoute.snapshot.queryParamMap.get("hacedorID");
  }

  ngAfterContentInit(): void {
    this.traerOfertas();
    this.traerServicios();
    this.hacedorID = this.activatedRoute.snapshot.queryParamMap.get("hacedorID");
  }

  traerOfertas() {
    this.ofertaService.ofertasHacedores()
      .subscribe(data => {
        if (data) {
          this.ofertas = data;
        }
      });
  }

  traerServicios() {
    this.servicioService.servicios()
      .subscribe(data => {
        if (data) {
          this.servicios = data;
          // console.log(this.servicios);
          this.findServiciosById();
        }
      });
  }

  findServiciosById() {
    const ids: Number[] = [];
    var i: number = 0;
    this.ofertas.forEach(oferta => {
      const change = this.servicios.find(servicio => servicio.servicioID === oferta.servicioID);
      this.ofertasMos.push({
        nombre: change?.nombre,
        descripcion: change?.descripcion,
        ofertaID: oferta.ofertaID,
        precio: oferta.precio,
        botonID: i++
      })
    });

  }

  aceptarOferta(ofertaID: number) {
    const aceptOfert: AceptOferta = {
      hacedorID: this.hacedorID,
      aceptado: true
    }
    // console.log(aceptOfert);

    this.ofertaService.aceptarSolicitud(aceptOfert, ofertaID);
    const ofertaDelete = this.ofertasMos.findIndex(oferta => oferta.ofertaID === ofertaID);
    this.ofertasMos.splice(ofertaDelete, 1);
  }

  rechazarOferta(ofertaID: number) {
    const ofertaDelete = this.ofertasMos.findIndex(oferta => oferta.ofertaID === ofertaID);
    this.ofertasMos.splice(ofertaDelete, 1);
  }

  back(){
    this.router.navigate(["/detalles-hacedor"], {
      queryParams:{
        hacedorID: this.hacedorID
      }
    });
  }
}
