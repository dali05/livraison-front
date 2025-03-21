import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LivraisonListComponent } from './components/livraison-list/livraison-list.component';
import { CreneauxListComponent } from './components/creneaux-list/creneaux-list.component';
import {AdminJourLivraisonComponent} from './components/admin-jour-livraison/admin-jour-livraison.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'livraisons', pathMatch: 'full' },
  { path: 'livraisons', component: LivraisonListComponent, canActivate: [AuthGuard], data: {roles: 'USER'}  },
  { path: 'creneaux', component: CreneauxListComponent, canActivate: [AuthGuard], data: {roles: 'USER'}  },
  { path: 'admin', component: AdminJourLivraisonComponent, canActivate: [AuthGuard], data: {roles: 'ADMIN'}  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
