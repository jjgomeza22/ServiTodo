import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Cliente, CrearCliente } from 'src/app/models/cliente.model';
import { CrearHacedor, Hacedor } from 'src/app/models/hacedor.model';
import { ClienteService } from '../../services/cliente.service';
import { HacedorService } from '../../services/hacedor.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  form!: FormGroup;
  rol: string = '';
  email: string = '';
  password: string = '';
  activeH: boolean = false;

  formReg!: FormGroup;
  selectI: number = 0;

  cliente: Cliente = {
    clienteID: 0,
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    direccion: '',
    email: '',
    numeroContacto: ''
  };

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
      {},
    ]
  };

  newCliente: CrearCliente = {
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    direccion: '',
    email: '',
    numeroContacto: ''
  };

  newHacedor: CrearHacedor = {
    nombre: '',
    apellido: '',
    nombreUsuario: '',
    contrasena: '',
    email: '',
    numeroContacto: '',
    direccion: '',
    disponibilidad: false,
    rangoTrabajo: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private hacedorService: HacedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required]

    });

    this.formReg = this.formBuilder.group({
      rolReg: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      passwordReg: ['', Validators.required],
      emailReg: ['', [Validators.required, Validators.email]],
      numeroContacto: ['', Validators.required],
      direccion: ['', Validators.required],
      disponibilidad: [''],
      rangoTrabajo: [''],
    });
  }

  onChanges(event: string) {
    this.activeH = (event === 'hacedor') ? true : false;
  }

  ingresar(): void {
    this.email = this.form.get('email')?.value;
    this.password = this.form.get('password')?.value;
    this.rol = this.form.get('rol')?.value;

    if (this.rol === 'cliente') {
      this.clienteService.login(this.email)
        .subscribe(data => {
          this.cliente = data;
          if (this.cliente.email == this.email) {
            this.router.navigate(["/oferta"], {});
          }
        });
    }
    else if (this.rol === 'hacedor') {
      this.hacedorService.login(this.email)
        .subscribe(data => {
          this.hacedor = data;
          if (this.hacedor.email == this.email) {
            this.router.navigate(["/detalles-hacedor"], {});
          }
        });
    }
  }

  registrar() {
    // this.selectI = 0;
    this.newCliente = {
      nombre: this.formReg.get('nombre')?.value,
      apellido: this.formReg.get('apellido')?.value,
      nombreUsuario: this.formReg.get('nombreUsuario')?.value,
      contrasena: this.formReg.get('passwordReg')?.value,
      direccion: this.formReg.get('direccion')?.value,
      email: this.formReg.get('emailReg')?.value,
      numeroContacto: this.formReg.get('numeroContacto')?.value,
    }
    if (this.formReg.get('rolReg')?.value === 'cliente') {
      this.clienteService.registrar(this.newCliente);
    }

    this.newHacedor = {
      nombre: this.formReg.get('nombre')?.value,
      apellido: this.formReg.get('apellido')?.value,
      nombreUsuario: this.formReg.get('nombreUsuario')?.value,
      contrasena: this.formReg.get('passwordReg')?.value,
      email: this.formReg.get('emailReg')?.value,
      numeroContacto: this.formReg.get('numeroContacto')?.value,
      direccion: this.formReg.get('direccion')?.value,
      disponibilidad: (this.formReg.get('disponibilidad')?.value === 'disponible') ? true : false,
      rangoTrabajo: this.formReg.get('rangoTrabajo')?.value,
    }
    if (this.formReg.get('rolReg')?.value === 'hacedor') {
      console.log(this.newHacedor);
      this.hacedorService.registrar(this.newHacedor);
    }
    this.tabGroup.selectedIndex = 0;
  }
}
