# Vue Keycloak Integration Demo (v1)

A Vue 3 application demonstrating OAuth 2.0 / OpenID Connect authentication and authorization with **Keycloak** as the identity provider.

## Features

- OAuth 2.0 Authorization Code flow with PKCE (S256)
- Role-based access control from JWT token claims
- Profile page with user info from Keycloak (`/profile`)
- Automatic token refresh
- Logout (ends session on the Keycloak server)
- 5 routes with different access levels
- Docker Compose setup for a local Keycloak server

## Pages and Access Levels

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public (no auth required) |
| `/unsecure` | Un-Secure | Public (no auth required) |
| `/user_secure` | User Secure | Authenticated users with `user` role |
| `/admin_secure` | Admin Secure | Authenticated users with `admin` role |
| `/profile` | Profile | Authenticated users (any role) |

## Quick Start

### 1. Start Keycloak

```bash
docker compose -f docker/keycloak/docker-compose.yml up -d
```

This starts Keycloak on `http://localhost:8080` with a pre-configured realm (`vue-realm`) and client (`web-front-client`).

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Test Users

| Username | Password | Roles |
|---|---|---|
| `user@users.com` | `123456` | `user` |
| `admin@users.com` | `123456` | `user`, `admin` |

## How It Works

1. **Login** – Clicking the login button redirects you to the Keycloak login page. After authentication, Keycloak redirects back with an authorization code, which is exchanged for tokens.
2. **Route Guards** – The router checks authentication status and required roles before rendering protected pages. Unauthenticated users are redirected to Keycloak login; unauthorized users (wrong role) are sent to `/unauthorized`.
3. **Token Management** – Access tokens are automatically refreshed when they expire.
4. **Logout** – Logging out calls the Keycloak server's logout endpoint, ending the SSO session.
5. **Roles** – The app extracts `realm_access.roles` from the decoded JWT access token to determine user permissions.

## Project Structure

```
src/
├── components/
│   ├── profile-menu/
│   │   ├── ProfileMenu.vue              # Switches between auth/unauthenticated
│   │   ├── ProfileMenuAuthenticated.vue # User menu (profile, logout)
│   │   └── ProfileMenuUnauthenticated.vue # Login button
│   └── profile-dialog/
│       └── ProfileDialog.vue            # User profile display
├── plugins/
│   └── keycloak.ts                      # Keycloak SDK wrapper (Auth class)
├── router/
│   └── index.ts                         # Routes + auth/role guards
├── views/
│   ├── Home.vue
│   ├── UnSecure.vue
│   ├── UserSecure.vue
│   ├── AdminSecure.vue
│   ├── Profile.vue
│   ├── Unauthorized.vue
│   └── NotFound.vue
└── App.vue
```

## Configuration

Keycloak client settings are in `public/keycloak.json`. Update these to match your Keycloak server:

```json
{
  "realm": "vue-realm",
  "auth-server-url": "http://localhost:8080/",
  "ssl-required": "external",
  "resource": "web-front-client",
  "public-client": true,
  "confidential-port": 0
}
```

## Tech Stack

- **Vue 3** with Composition API (TypeScript)
- **Vue Router 4** (route guards for auth/authorization)
- **Vuetify 3** (UI framework)
- **Pinia** (state management)
- **Vite** (build tool)
- **keycloak-js** (Keycloak adapter)
- **Keycloak 26.7** (identity provider)
