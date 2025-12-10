# HestIA - Application avec Base de Données SQL

Application de signalement avec interface glassmorphisme et base de données SQLite.

## Installation

1. Installer Node.js depuis https://nodejs.org/

2. Installer les dépendances :
```bash
npm install
```

## Démarrage

1. Lancer le serveur backend :
```bash
npm start
```

Le serveur démarre sur http://localhost:3000

2. Ouvrir index.html dans le navigateur ou visiter http://localhost:3000

## Base de Données

La base de données SQLite (`hestia.db`) sera créée automatiquement au premier démarrage.

### Tables :

**users**
- id (INTEGER PRIMARY KEY)
- lastName (TEXT)
- firstName (TEXT)
- age (INTEGER)
- email (TEXT UNIQUE)
- password (TEXT - hashé avec bcrypt)
- createdAt (DATETIME)

**responses**
- id (INTEGER PRIMARY KEY)
- userId (INTEGER - référence users.id)
- question1 (TEXT - "Décris-moi ce qui s'est passé")
- question2 (TEXT - "Oui" ou "Non" pour la question sur les proches)
- timestamp (DATETIME)

## API Endpoints

### POST /api/register
Inscription d'un nouvel utilisateur

### POST /api/login
Connexion utilisateur

### GET /api/users
Récupère tous les utilisateurs et leurs réponses (admin)

### GET /api/responses/:userId
Récupère les réponses d'un utilisateur spécifique

## Sécurité

- Mots de passe hashés avec bcrypt
- Validation côté serveur :
  - Minimum 8 caractères
  - Au moins 1 majuscule
  - Au moins 1 caractère spécial
- Email unique
- CORS activé pour développement

## Compte Admin

- Email: admin
- Mot de passe: admin

## Personnalisation

- Couleurs de marque : modifiez les variables CSS `--brand-start` et `--brand-end` dans `styles.css`.
- Texte : éditez le titre dans `index.html`.
- Animation : ajustez `@keyframes drift` et les durées des `.blob`.

