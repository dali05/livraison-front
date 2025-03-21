
import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak-test-dev.duckdns.org/',
        realm: 'livraison-back',
        clientId: 'livraison-front'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
      },
      enableBearerInterceptor: true,
    });
}
