import { Component } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAdmin = false;
  isUser = false;

  constructor(private keycloakService: KeycloakService) {
    this.checkRoles();
  }

  async checkRoles() {
    const userRoles = await this.keycloakService.getUserRoles();
    this.isAdmin = userRoles.includes('ADMIN');
    this.isUser = userRoles.includes('USER');
  }
  logout() {
    this.keycloakService.logout();
  }
}
