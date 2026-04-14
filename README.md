# Gestionnaire de Magasins

Une application React complète pour gérer un magasin en ligne avec authentification, gestion des produits, des commandes et des utilisateurs.

## Fonctionnalités

### Mode Administrateur
- **Tableau de bord** : Statistiques globales du magasin
- **Gestion des produits** : Ajouter, modifier, supprimer des produits (nom, prix, description, quantité)
- **Gestion des commandes** : Voir les commandes, valider les commandes (met à jour automatiquement le stock)
- **Gestion des utilisateurs** : Ajouter de nouveaux utilisateurs administrateurs

### Mode Client
- **Boutique** : Voir les produits disponibles et ajouter au panier
- **Panier** : Gérer les articles du panier, modifier les quantités
- **Commande** : Passer une commande avec informations personnelles (nom, prénom, email)

## Installation

### 1. Cloner ou extraire le projet

```bash
cd tp--3
```

### 2. Installer les dépendances

```bash
npm install
```

## Démarrage du projet

Vous devez lancer deux services en parallèle :

### Terminal 1 : Démarrer json-server (API)

```bash
npm run server
```

L'API sera disponible sur `http://localhost:3001`

### Terminal 2 : Démarrer l'application React

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## Identifiants de connexion

### Admin
- Email: `admin@store.com`
- Mot de passe: `admin123`

### Manager
- Email: `manager@store.com`
- Mot de passe: `manager123`

## Architecture du projet

```
src/
├── components/          # Composants réutilisables
├── context/            # Contextes React (Auth, Cart)
├── pages/              # Pages principales
│   ├── LoginPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProductsPage.jsx
│   ├── OrdersPage.jsx
│   ├── UsersPage.jsx
│   ├── ShopPage.jsx
│   └── CartPage.jsx
├── services/           # Services API
│   ├── api.js          # Configuration API de base
│   ├── productService.js
│   ├── orderService.js
│   └── userService.js
├── styles/             # CSS
│   └── App.css
├── App.jsx             # Composant principal
└── main.jsx            # Point d'entrée
```

## Services API

L'application utilise des services pour abstraire les appels API. Aucun `fetch` n'est écrit directement dans les composants.

### Exemple d'utilisation :

```javascript
import { productService } from './services/productService';

// Récupérer tous les produits
const products = await productService.getProducts();

// Créer un produit
await productService.createProduct({
  name: 'Laptop',
  price: 999.99,
  description: 'High-performance laptop',
  quantity: 10
});

// Mettre à jour un produit
await productService.updateProduct(1, updatedProduct);

// Supprimer un produit
await productService.deleteProduct(1);
```

## Données (db.json)

Le fichier `db.json` contient les données initiales :
- `users` : Utilisateurs administrateurs
- `products` : Produits du magasin
- `orders` : Commandes

## Gestion de l'état

### AuthContext
Gère l'authentification et l'utilisateur connecté.

```javascript
const { user, login, logout } = useAuth();
```

### CartContext
Gère le panier du client.

```javascript
const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
```

## Validation de commande

Lorsqu'une commande est validée :
1. Le statut passe de "pending" à "completed"
2. Le stock des produits commandés est automatiquement réduit

## Styles

Les styles sont centralisés dans `src/styles/App.css` avec :
- Un système de grille responsive
- Boutons variés (primaire, secondaire, danger, succès)
- Cartes, tableaux, modales
- Messages d'alerte
- Animations de chargement

## Limitations et améliorations futures

- Authentification basée sur localStorage (pour production, utiliser JWT)
- Pas de validation côté serveur (à ajouter)
- Pas de paiement réel
- Pas de notifications par email

## Construction pour la production

```bash
npm run build
```

## Troubleshooting

### json-server ne démarre pas
Assurez-vous que le port 3001 est disponible.

### L'application ne se connecte pas à l'API
Vérifiez que json-server est en cours d'exécution sur `http://localhost:3001`.

### Les changements CSS ne s'appliquent pas
Clear le cache du navigateur (Ctrl+Shift+Del sur mostnavigateurs).

## Technologies utilisées

- **React** 18.2.0
- **Vite** 4.3.0
- **json-server** 0.17.3
- **JavaScript ES6+**

## Licence

MIT
