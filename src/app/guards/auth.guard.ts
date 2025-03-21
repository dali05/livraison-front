import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard extends KeycloakAuthGuard implements CanActivate {

  constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!this.authenticated) {
      await this.keycloak.login();
      return false;
    }

    const requiredRoles = route.data['roles'];

    if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) {
      return true;
    }

    const hasRequiredRole = requiredRoles.some(role => this.roles.includes(role));

    if (!hasRequiredRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
