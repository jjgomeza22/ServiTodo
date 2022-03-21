import { Route } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { DetallesHacedorComponent } from "./components/detalles-hacedor/detalles-hacedor.component";
import { OfertaComponent } from "./components/oferta/oferta.component";
import { TablaOfertasComponent } from "./components/tabla-ofertas/tabla-ofertas.component";

export const appRoutes: Route[] = [
  {path:'', pathMatch: 'full', redirectTo: 'ingresar'},
  {path: 'ingresar', component: AuthComponent},
  {path: 'oferta', component: OfertaComponent},
  {path: 'detalles-hacedor', component: DetallesHacedorComponent},
  {path: 'tabla-ofertas', component: TablaOfertasComponent},
]
