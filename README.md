# Freedom Librairies API 🎮

Une API REST moderne et modulaire pour accéder aux données des armes. Construite avec Node.js et Express.js avec une architecture propre et organisée.

## 🚀 Fonctionnalités

- **Architecture modulaire** : Code organisé en couches (controllers, services, middleware, routes)
- **API RESTful** : Endpoints intuitifs et bien documentés
- **Gestion d'erreurs** : Middleware de gestion d'erreurs centralisé
- **Logging** : Système de logs pour le monitoring
- **Sécurité** : Protection avec Helmet et CORS
- **Configuration** : Variables d'environnement pour différents environnements
- **Performance** : Réponses optimisées et mise en cache

## 📋 Prérequis

- Node.js >= 14.0.0
- npm ou yarn

## 🛠️ Installation

1. Cloner le repository
```bash
git clone https://github.com/groupe-hadouane2/freedom-librairies.git
cd freedom-librairies
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer le fichier .env selon vos besoins
```

4. Démarrer le serveur
```bash
# Mode développement (avec auto-reload)
npm run dev

# Mode production
npm start
```

Le serveur sera accessible sur `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 🏥 Health Check
```http
GET /api/health
```
Vérifie l'état du serveur et retourne les informations système.

**Réponse :**
```json
{
  "success": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": "5m 30s",
  "memory": {
    "rss": "50 MB",
    "heapTotal": "30 MB",
    "heapUsed": "25 MB"
  },
  "environment": "development",
  "version": "1.0.0"
}
```

#### 🔫 Récupérer toutes les armes
```http
GET /api/weapons
```

**Réponse :**
```json
{
  "success": true,
  "count": 95,
  "data": [
    {
      "id": "minigun",
      "filename": "weapon_minigun.json",
      "name": "Minigun",
      "hash": "0x42BF8A85",
      "recoil": {
        "vertical": 2.0,
        "horizontal": 0.5,
        "pattern": [0.0, 1.5, 2.0, 1.0, 0.0]
      },
      "damage": {
        "head": 500,
        "chest": 500,
        "stomach": 500,
        "arms": 500,
        "legs": 500
      },
      "ammo": {
        "magazine_size": 1,
        "max_ammo": 20,
        "reload_time": 4.5
      },
      "distance_falloff": {
        "min_distance": 10.0,
        "max_distance": 300.0,
        "falloff_rate": 0.1
      }
    }
  ]
}
```

#### 🎯 Récupérer une arme spécifique
```http
GET /api/weapons/:name
```

**Paramètres :**
- `name` : Nom ou ID de l'arme (ex: "minigun", "assaultrifle")

**Exemple :**
```http
GET /api/weapons/minigun
```

#### 🔍 Rechercher des armes
```http
GET /api/weapons/search?q=:query
```

**Paramètres de requête :**
- `q` : Terme de recherche (1-100 caractères)

**Exemple :**
```http
GET /api/weapons/search?q=rifle
```

#### 📊 Statistiques des armes
```http
GET /api/weapons/stats
```

**Réponse :**
```json
{
  "success": true,
  "data": {
    "total": 95,
    "categories": {},
    "averageDamage": 150,
    "averageRecoil": 1.5
  }
}
```

### Codes de statut HTTP

- `200` - Succès
- `400` - Requête invalide
- `404` - Ressource non trouvée
- `500` - Erreur serveur interne

### Format des erreurs

```json
{
  "error": true,
  "message": "Description de l'erreur",
  "stack": "Stack trace (en mode développement uniquement)"
}
```

## 🏗️ Architecture du projet

```
📁 freedom-librairies/
├── 📄 server.js              # Point d'entrée de l'application
├── 📄 package.json           # Dépendances et scripts
├── 📄 .env.example           # Variables d'environnement exemple
├── 📄 .gitignore            # Fichiers à ignorer par Git
├── 📁 src/                   # Code source principal
│   ├── 📄 app.js             # Configuration Express
│   ├── 📁 config/            # Configuration de l'application
│   │   └── 📄 index.js       # Variables de configuration
│   ├── 📁 controllers/       # Logique métier
│   │   └── 📄 weaponsController.js
│   ├── 📁 services/          # Services de données
│   │   └── 📄 weaponService.js
│   ├── 📁 routes/            # Définition des routes
│   │   ├── 📄 index.js       # Routes principales
│   │   └── 📄 weapons.js     # Routes des armes
│   ├── 📁 middleware/        # Middlewares personnalisés
│   │   ├── 📄 errorHandler.js # Gestion des erreurs
│   │   └── 📄 logger.js      # Logging des requêtes
│   └── 📁 utils/             # Fonctions utilitaires
│       └── 📄 helpers.js     # Fonctions d'aide
└── 📁 weapon/                # Données JSON des armes
    ├── 📄 weapon_minigun.json
    ├── 📄 weapon_assaultrifle.json
    └── 📄 ...
```

## 🛡️ Sécurité

- **Helmet** : Protection contre les vulnérabilités web communes
- **CORS** : Configuration des origines autorisées
- **Validation** : Validation des entrées utilisateur
- **Rate limiting** : Protection contre les attaques par déni de service
- **Logs** : Monitoring et audit des requêtes

## 🚀 Déploiement

### Variables d'environnement

```bash
PORT=3000                    # Port du serveur
NODE_ENV=production         # Environnement (development/production)
API_PREFIX=/api             # Préfixe des routes API
CORS_ORIGIN=*              # Origines CORS autorisées
LOG_LEVEL=info             # Niveau de logging
```

### Scripts disponibles

```bash
npm start          # Démarrage en production
npm run dev        # Démarrage en développement avec auto-reload
npm test           # Exécution des tests (à implémenter)
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commiter les changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Créer une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **groupe-hadouane2** - *Développement initial*

## 🆘 Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.