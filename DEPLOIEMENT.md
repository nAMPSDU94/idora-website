# Guide de Déploiement — IDORA Website

## Option recommandée : Railway (frontend + backend + DB en un seul endroit)

### Étape 1 — Créer un compte Railway
1. Va sur https://railway.app
2. Connecte-toi avec GitHub
3. Clique "New Project"

### Étape 2 — Préparer le projet pour Railway

Dans le dossier `idora-website/backend/`, ouvre `.env` et change :
```
DATABASE_URL="postgresql://..."   ← Railway te donne cette URL automatiquement
```

Dans `backend/prisma/schema.prisma`, change :
```prisma
datasource db {
  provider = "postgresql"   ← remplace "sqlite" par "postgresql"
  url      = env("DATABASE_URL")
}
```

### Étape 3 — Mettre sur GitHub
```bash
cd C:\Users\ibena\Downloads\Programs\idora-website
git init
git add .
git commit -m "IDORA website initial"
git remote add origin https://github.com/TON-USERNAME/idora-website.git
git push -u origin main
```

### Étape 4 — Déployer sur Railway
1. Sur Railway → "New Project" → "Deploy from GitHub repo"
2. Sélectionne ton repo `idora-website`
3. Railway détecte automatiquement Node.js
4. Ajoute un plugin **PostgreSQL** (clique "Add Plugin" → PostgreSQL)
5. Railway copie automatiquement `DATABASE_URL` dans les variables d'env

### Étape 5 — Variables d'environnement Railway
Dans Railway → ton projet → Variables, ajoute :
```
PORT=3001
NODE_ENV=production
ADMIN_SECRET=ton-mot-de-passe-admin
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ton-email@gmail.com
SMTP_PASS=ton-app-password-gmail
EMAIL_FROM=IDORA Magazines <hello@idora-mag.com>
EMAIL_ADMIN=ton-email@gmail.com
FRONTEND_URL=https://ton-domaine.railway.app
```

### Étape 6 — Commande de démarrage
Dans Railway → Settings → Start Command :
```
cd backend && npx prisma migrate deploy && node src/server.js
```

### Étape 7 — Domaine personnalisé (optionnel)
Dans Railway → Settings → Domains → "Generate Domain" pour avoir une URL gratuite,
ou connecte ton propre domaine (ex: idora-mag.com).

---

## Alternative gratuite : Render.com

1. Va sur https://render.com
2. "New Web Service" → connecte GitHub
3. Build Command : `cd backend && npm install && npx prisma generate`
4. Start Command : `cd backend && npx prisma migrate deploy && node src/server.js`
5. Ajoute une base PostgreSQL gratuite dans Render
6. Configure les mêmes variables d'environnement

---

## Email Gmail — Configuration

Pour envoyer de vrais emails :
1. Va sur https://myaccount.google.com/security
2. Active "Authentification à 2 facteurs"
3. Cherche "Mots de passe des applications"
4. Crée un mot de passe pour "Mail"
5. Copie ce mot de passe dans `SMTP_PASS`

---

## Structure finale du projet

```
idora-website/
├── index.html          ← Site principal
├── admin.html          ← Panel admin (http://ton-domaine/admin)
├── images/             ← Toutes les images
│   ├── logo.jpg
│   ├── about.jpg
│   ├── magazines-1.jpg
│   ├── magazines-2.jpg
│   └── gallery-preview.png
└── backend/
    ├── src/server.js   ← API Express
    ├── prisma/         ← Base de données
    └── uploads/        ← Photos des clients
```

## Accès après déploiement

- **Site** : https://ton-domaine.railway.app
- **Admin** : https://ton-domaine.railway.app/admin
- **API** : https://ton-domaine.railway.app/api/health
