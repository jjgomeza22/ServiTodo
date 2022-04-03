import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { DialogHacedores, DialogServicios, OfertaComponent } from './components/oferta/oferta.component';
import { DetallesHacedorComponent } from './components/detalles-hacedor/detalles-hacedor.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { TablaOfertasComponent } from './components/tabla-ofertas/tabla-ofertas.component';
import { VistaAdministradorComponent } from './components/vista-administrador/vista-administrador.component';
import { DialogOfertaComponent } from './components/oferta/dialog-oferta/dialog-oferta.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    OfertaComponent,
    DetallesHacedorComponent,
    DialogHacedores,
    DialogServicios,
    TablaOfertasComponent,
    VistaAdministradorComponent,
    DialogOfertaComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [AuthComponent],
  providers: [],
  entryComponents: [MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
