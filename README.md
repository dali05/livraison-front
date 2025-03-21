# Application Frontend Gestion Livraison (Angular)

## Présentation
Ce projet Angular constitue l'interface utilisateur pour l'application de gestion des livraisons. Il permet la gestion des livraisons, la consultation des créneaux disponibles, ainsi que l'administration des jours de livraison pour les utilisateurs ayant le rôle ADMIN.

## Technologies
- **Angular 17**
- **Bootstrap** (style CSS)
- **Keycloak** (authentification et gestion des rôles)
- **HttpClient** pour les appels API REST

## Fonctionnalités principales
- **Gestion des Livraisons** : Consultation et création de livraisons avec sélection des produits.
- **Créneaux Horaires** : Sélection et réservation des créneaux disponibles.
- **Administration** : Création des jours et créneaux horaires par les administrateurs.
- **Sécurité** : Gestion des accès basée sur les rôles via Keycloak.

## Structure du Projet
```
src/
├── app/
│   ├── components/
│   │   ├── livraison-list
│   │   ├── creneaux-list
│   │   └── admin-jour-livraison
│   ├── models/
│   ├── services/
│   ├── guards/
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   ├── app.module.ts
│   └── keycloak.config.ts
└── index.html
```

## Composants
- `LivraisonListComponent` : Affiche les livraisons existantes.
- `CreneauxListComponent` : Permet la création d'une livraison et sélection des créneaux horaires.
- `AdminJourLivraisonComponent` : Gestion administrative des jours de livraison et créneaux.

## Routage
- `/livraisons` : Liste des livraisons.
- `/creneaux` : Création des livraisons et réservation des créneaux.
- `/admin` : Gestion administrative (réservé aux administrateurs).

## Sécurité et Authentification (Keycloak)
L'application utilise Keycloak pour authentifier les utilisateurs et gérer les autorisations par rôles :
- Rôle `USER` : Accès aux fonctionnalités générales.
- Rôle `ADMIN` : Accès à l'interface d'administration.

## Initialisation Keycloak
Configuration dans `keycloak.config.ts` :
```typescript
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
```

## Installation et Lancement

### Prérequis
- Node.js & npm installés.

### Installer les dépendances
```bash
npm install
```

### Démarrer l'application
```bash
ng serve
```

### Accéder à l'application
- URL Frontend : [http://localhost:4200](http://localhost:4200)

## Services
- `ProduitService` : Gestion des produits via API.
- `LivraisonService` : Gestion des livraisons via API.
- `CreneauService` : Gestion des créneaux via API.
- `AdminService` : Administration des jours de livraison via API.
