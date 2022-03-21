import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Oferta, SolicitudOferta } from 'src/app/models/oferta.model';
import { Servicio } from 'src/app/models/servicio.model';
import {ServicioService} from '../../services/servicio.service'
import {OfertaService} from '../../services/oferta.service';
import { ClienteService } from 'src/app/services/cliente.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HacedorService } from 'src/app/services/hacedor.service';
import { Hacedor } from 'src/app/models/hacedor.model';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.scss']
})
export class OfertaComponent implements OnInit {

  form!: FormGroup;
  formCon!: FormGroup;
  servicios: Servicio[] = [];
  clienteID: number = 0;
  hacedores: Hacedor[] = [];
  ofertasAcept: Oferta[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private ofertaService: OfertaService,
    private hacedorService: HacedorService,
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
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
      hacedor:['', Validators.required],
      servicioCon:['', Validators.required]
    });

    this.consultarServicios();
    this.clienteService.sendCliente$.subscribe(cliente => {
      this.clienteID = cliente.clienteID;
    });

    this.traerHacedores();
    this.ofertasAceptadas();
  }

  openDialogHacedores() {
    const hacedorID = this.formCon.get('hacedor')?.value;
    const hacedor = this.hacedores.find(hacedor => hacedor.hacedorID === hacedorID);

    // console.log(hacedor);


    this.dialog.open(DialogHacedores, {
      data: hacedor
    });
  }

  openDialogService() {

    const servicioID = this.formCon.get('servicioCon')?.value;
    const servicio = this.servicios.find(servicio => servicio.servicioID === servicioID);

    // console.log(servicio);

    this.dialog.open(DialogServicios, {
      data: servicio,
    });
  }

  consultarServicios(){
    this.servicioService.servicios()
    .subscribe(data => {
      data.map(servicio => {
        this.servicios.push(servicio);
      });
    });
  }

  enviarOferta(){
    const servi =  this.servicios.find(servicio => servicio.nombre === this.form.get('servicio')?.value);

    const oferta: SolicitudOferta = {
      clienteID: this.clienteID,
      servicioID: servi!.servicioID,
      direccion: this.form.get('direccion')?.value,
      habilitado: (this.form.get('habilitar')?.value === 'habilitar') ? true : false,
      fecha: this.form.get('fecha')?.value,
      precio: this.form.get('precio')?.value
    }

    console.log(oferta);

    this.ofertaService.registar(oferta);
  }

  traerHacedores(){
    this.hacedorService.consultarHacedores()
    .subscribe(data => {
      console.log(data);
      this.hacedores = data;
    })
  }

  ofertasAceptadas(){
    this.ofertaService.ofertasAceptadas()
    .subscribe(data => {
      this.ofertasAcept = data;
    })
  }
}
@Component({
  selector: 'dialogServicios',
  templateUrl: 'dialogServicios.html',
})
export class DialogServicios {

  constructor(
    @Inject (MAT_DIALOG_DATA) public servicio: Servicio
  ){
  }

}

@Component({
  selector: 'dialogHacedores',
  templateUrl: 'dialogHacedores.html',
})
export class DialogHacedores {

  constructor(
    @Inject (MAT_DIALOG_DATA) public hacedor: Hacedor
  ){console.log(hacedor);
  }
}
