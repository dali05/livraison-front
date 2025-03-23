
import { KeycloakService } from 'keycloak-angular';
import {environment} from '../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak-test-dev.duckdns.org/',
        realm: environment.realm,
        clientId: 'livraison-front'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });
}
