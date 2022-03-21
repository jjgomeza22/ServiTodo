import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DetallesH } from 'src/app/models/hacedor.model';
import { EnvHabilidad, Habilidad } from 'src/app/models/habilidad.model';
import { HacedorService } from '../../services/hacedor.service';
import { HabilidadService } from '../../services/habilidad.service';
import { HacedorHabilidadService} from '../../services/hacedor-habilidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-hacedor',
  templateUrl: './detalles-hacedor.component.html',
  styleUrls: ['./detalles-hacedor.component.scss']
})
export class DetallesHacedorComponent implements OnInit {

  formDetalles!: FormGroup;
  formHabilidad!: FormGroup;
  actForm: boolean = true;
  isChecked: boolean = false;

  detallesH: DetallesH = {
    numeroContacto: '',
    rangoTrabajo: ''
  }

  // habilidads!: Habilidad[];
  habilidads: Habilidad[] = [{
    habilidadID: 0,
    nombre: '',
    descripcion: ''
  }];

  hab: EnvHabilidad = {
    habilidadID: 0,
    hacedorID: 0
  }

  hacedorID: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private hacedorService: HacedorService,
    private habilidadService: HabilidadService,
    private hacedorHabilidadService: HacedorHabilidadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formDetalles = this.formBuilder.group({
      modificarDetalles: ['', Validators.required],
      numeroContacto: [{value: '', disabled: true}, Validators.required],
      rangoTrabajo: [{value: '', disabled: true}, Validators.required],
    });

    this.formHabilidad = this.formBuilder.group({
      habilidad: ['', Validators.required],
    });

    this.habilidades();

    this.hacedorService.sendHacedor$.subscribe(hacedor => {
      this.hacedorID = hacedor.hacedorID;
    })
  }

  checkBox(event: boolean){
    if(event){
      this.formDetalles.get('numeroContacto')?.enable();
      this.formDetalles.get('rangoTrabajo')?.enable();
      this.actForm = !event;
    }
    else {
      this.formDetalles.get('numeroContacto')?.disable();
      this.formDetalles.get('rangoTrabajo')?.disable();
      this.actForm = !event;
    }

  }

  actDatos(){
    this.detallesH = {
      numeroContacto: this.formDetalles.get('numeroContacto')?.value,
      rangoTrabajo: this.formDetalles.get('rangoTrabajo')?.value
    }
    this.formDetalles.controls['modificarDetalles'].setValue(false);
    this.hacedorService.registrarDetalles(this.detallesH);
  }

  habilidades(){
    this.habilidadService.consultar()
    .subscribe(data => {
      this.habilidads = data
    });
  }

  enviarHabilidad(){
    const habili =  this.habilidads.find(habilidad => habilidad.nombre === this.formHabilidad.get('habilidad')?.value);
    this.hab = {
      habilidadID: habili!.habilidadID,
      hacedorID: this.hacedorID
    }
    this.hacedorHabilidadService.registrar(this.hab)
  }

  irOfertas(){
    this.router.navigate(["/tabla-ofertas"], {});
  }
}
