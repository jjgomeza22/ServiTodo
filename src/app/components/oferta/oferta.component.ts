import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Oferta, OfertasAcep, SolicitudOferta } from 'src/app/models/oferta.model';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from '../../services/servicio.service'
import { OfertaService } from '../../services/oferta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HacedorService } from 'src/app/services/hacedor.service';
import { Hacedor } from 'src/app/models/hacedor.model';
import { HabilidadService } from '../../services/habilidad.service';
import { Habilidad } from 'src/app/models/habilidad.model';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  form: FormGroup;
  formCon: FormGroup;
  formCon1: FormGroup;
  formCon2: FormGroup;
  servicios: Servicio[] = [];
  clienteID: any = 0;
  hacedores: Hacedor[] = [];
  ofertasAcept: Oferta[] = [];
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
  };

  // habilidads!: Habilidad[];
  habilidads: Habilidad[] = [{
    habilidadID: 0,
    nombre: '',
    descripcion: ''
  }];

  ofertasMos: OfertasAcep[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private ofertaService: OfertaService,
    private hacedorService: HacedorService,
    private clienteService: ClienteService,
    private habilidadService: HabilidadService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      direccion: ['', Validators.required,],
      habilitar: ['', Validators.required],
      fecha: ['', Validators.required],
      precio: ['', Validators.required],
      servicio: ['', Validators.required]
    });

    this.formCon = this.formBuilder.group({
      hacedor: ['', Validators.required],
    });

    this.formCon1 = this.formBuilder.group({
      servicioCon: ['', Validators.required]
    });

    this.formCon2 = this.formBuilder.group({
      serviciosAceptados: ['', Validators.required]
    });

    this.consultarServicios();
    this.clienteID = this.activatedRoute.snapshot.queryParamMap.get("clienteID");

    this.traerHacedores();
    this.habilidades();
    this.ofertasAceptadas();
  }

  habilidades() {
    this.habilidadService.consultar()
      .subscribe(data => {
        this.habilidads = data
      });
  }

  openDialogHacedores() {
    const hacedorID = this.formCon.get('hacedor')?.value;
    this.hacedor = this.hacedores.find(hacedor => hacedor.hacedorID === hacedorID);

    this.dialog.open(DialogHacedores, {
      data: this.hacedor
    });
  }

  openDialogService() {

    const servicioID = this.formCon1.get('servicioCon')?.value;
    const servicio = this.servicios.find(servicio => servicio.servicioID === servicioID);

    // console.log(servicio);

    this.dialog.open(DialogServicios, {
      data: servicio,
    });
  }

  openDialogServiciosAceptados() {
    const ofertaAceptID = this.formCon2.get('serviciosAceptados')?.value;
    const ofertaAcept = this.ofertasMos.find(oferta => oferta.ofertaID === ofertaAceptID);

    this.dialog.open(DialogOfertas, {
      data: ofertaAcept,
    });
  }

  consultarServicios() {
    this.servicioService.servicios()
      .subscribe(data => {
        this.servicios = data;
        // console.log(data);
      });
  }

  enviarOferta() {
    const servi = this.servicios.find(servicio => servicio.nombre === this.form.get('servicio')?.value);

    const oferta: SolicitudOferta = {
      clienteID: this.clienteID,
      servicioID: servi!.servicioID,
      direccion: this.form.get('direccion')?.value,
      habilitado: (this.form.get('habilitar')?.value === 'habilitar') ? true : false,
      fecha: this.form.get('fecha')?.value,
      precio: this.form.get('precio')?.value
    }

    // console.log(oferta);

    this.ofertaService.registar(oferta);
  }

  traerHacedores() {
    this.hacedorService.consultarHacedores()
      .subscribe(data => {
        // console.log(data);
        this.hacedores = data;
      })
  }

  ofertasAceptadas() {
    this.ofertaService.ofertasAceptadas()
      .subscribe(data => {
        this.ofertasAcept = data;
        this.findServiciosById();

      })
  }

  findServiciosById() {

    this.ofertasAcept.forEach(oferta => {
      const change = this.servicios.find(servicio => servicio.servicioID === oferta.servicioID);
      this.ofertasMos.push({
        nombre: change.nombre,
        descripcion: change.descripcion,
        ofertaID: oferta.ofertaID,
        precio: oferta.precio,
        aceptada: oferta.aceptado
      })
    });
  }
}
@Component({
  selector: 'dialogServicios',
  templateUrl: 'dialogServicios.html',
})
export class DialogServicios {

  constructor(
    @Inject(MAT_DIALOG_DATA) public servicio: Servicio
  ) {
  }

}

@Component({
  selector: 'dialogHacedores',
  templateUrl: 'dialogHacedores.html',
})
export class DialogHacedores {

  constructor(
    @Inject(MAT_DIALOG_DATA) public hacedor: Hacedor
  ) {
  }
}

@Component({
  selector: 'dialogOfertas',
  templateUrl: 'dialogOferta.html',
})
export class DialogOfertas {

  constructor(
    @Inject(MAT_DIALOG_DATA) public ofertaAcept: OfertasAcep
  ) {
  }
}
