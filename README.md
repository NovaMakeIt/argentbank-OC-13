# Argent Bank – Application Frontend

Ce projet est la partie frontend React de l’application bancaire “Argent Bank”.

## Fonctionnalités principales

- Authentification utilisateur (login/logout) avec JWT
- Affichage et édition du profil utilisateur
- Navigation conditionnelle selon l’état de connexion
- Gestion d’état globale avec Redux Toolkit
- Protection des routes privées (RequireAuth)
- UI responsive et accessible

## Démarrage rapide

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

3. **Accéder à l’application**
   - Ouvre [http://localhost:5173](http://localhost:5173) dans ton navigateur.

## Structure du projet

- `src/features/auth/` : logique d’authentification (Redux slice, API)
- `src/pages/` : pages principales (`Home`, `SignIn`, `User`)
- `src/components/` : composants réutilisables (`Header`, `Footer`, `RequireAuth`)
- `src/app/store.js` : configuration du store Redux
- `src/app/hooks.js` : hooks personnalisés pour Redux

## Gestion de l’état (Redux)

L’application utilise Redux Toolkit :
- **Store** centralisé dans `src/app/store.js`
- **Actions** et **reducers** dans `src/features/auth/authSlice.js`
- **Hooks** personnalisés pour simplifier l’utilisation dans les composants

## Spécification API

La spécification Swagger des endpoints pour le User se trouve dans le fichier `swagger.yaml`.