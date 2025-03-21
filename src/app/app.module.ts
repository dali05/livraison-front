
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {LivraisonListComponent} from './components/livraison-list/livraison-list.component';
import { CreneauxListComponent } from './components/creneaux-list/creneaux-list.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AdminJourLivraisonComponent } from './components/admin-jour-livraison/admin-jour-livraison.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak.config';

@NgModule({
  declarations: [
    AppComponent,
    LivraisonListComponent,
    CreneauxListComponent,
    AdminJourLivraisonComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    KeycloakAngularModule

  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
