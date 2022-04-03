import { Component, OnInit, OnChanges, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente, CrearCliente } from 'src/app/models/cliente.model';
import { CrearHacedor, Hacedor } from 'src/app/models/hacedor.model';
import { ClienteService } from '../../services/cliente.service';
import { HacedorService } from '../../services/hacedor.service';

import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  actToast = false;

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  form!: FormGroup;
  rol: string = '';
  email: string = '';
  password: string = '';
  activeH: boolean = false;

  formReg!: FormGroup;
  formReg1!: FormGroup;
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
      {
        hacedorID: 0,
        habilidadID: 0
      },
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
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
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
    });

    this.formReg1 = this.formBuilder.group({
      disponibilidad: ['', Validators.required],
      rangoTrabajo: ['', Validators.required],
    });
  }

  onChanges(event: string) {
    this.activeH = (event === 'hacedor') ? true : false;
  }


  openSnackBar(text) {
    this._snackBar.open(text, '', {
      duration: 1 * 2200,
      panelClass: ['toast']
    })
  }

  ingresar(): void {

    this.actToast = !this.actToast;

    this.email = this.form.get('email')?.value;
    this.password = this.form.get('password')?.value;
    this.rol = this.form.get('rol')?.value;

    if (this.rol === 'cliente') {
      this.clienteService.login(this.email)
        .subscribe(data => {
          this.cliente = data;
          if (this.cliente.contrasena == this.password) {
            this.router.navigate(["/oferta"], {
              queryParams: {
                clienteID: data.clienteID
              }
            });
            this.openSnackBar('Bienvenido ' + data.nombre)
          } else {
            this.openSnackBar('Usuario o contraseña incorrectos')
          }
        });
    }
    else if (this.rol === 'hacedor') {
      this.hacedorService.login(this.email)
        .subscribe(data => {
          this.hacedor = data;
          if (this.hacedor.contrasena == this.password) {
            this.router.navigate(["/detalles-hacedor"], {
              queryParams: {
                hacedorID: data.hacedorID
              }
            });
            this.openSnackBar('Bienvenido ' + data.nombre)
          } else {
            this.openSnackBar('Usuario o contraseña incorrectos')
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
      this.clienteService.registrar(this.newCliente)
        .subscribe(data => {

          if (data) {
            // console.log(data);
          } else{
            // console.log("Holi");

          }


          // if(data){
          //   this.openSnackBar('Usuario ya existente.');
          // }else {
          //   this.openSnackBar('Usuario Registrado Correctamente.')
          // }
        });
    }

    this.newHacedor = {
      nombre: this.formReg.get('nombre')?.value,
      apellido: this.formReg.get('apellido')?.value,
      nombreUsuario: this.formReg.get('nombreUsuario')?.value,
      contrasena: this.formReg.get('passwordReg')?.value,
      email: this.formReg.get('emailReg')?.value,
      numeroContacto: this.formReg.get('numeroContacto')?.value,
      direccion: this.formReg.get('direccion')?.value,
      disponibilidad: (this.formReg1.get('disponibilidad')?.value === 'disponible') ? true : false,
      rangoTrabajo: this.formReg1.get('rangoTrabajo')?.value,
    }
    if (this.formReg.get('rolReg')?.value === 'hacedor') {
      // console.log(this.newHacedor);
      this.hacedorService.registrar(this.newHacedor);
      this.openSnackBar('Usuario Registrado Correctamente.')
    }
    this.tabGroup.selectedIndex = 0;
  }
}
