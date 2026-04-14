# Guide de démarrage rapide

## ✅ Installation et lancement

### Étape 1: Installer les dépendances
```bash
npm install
```

### Étape 2: Lancer json-server (Terminal 1)
```bash
npm run server
```
Port: `http://localhost:3001`

### Étape 3: Lancer l'application React (Terminal 2)
```bash
npm run dev
```
Port: `http://localhost:3000`

---

## 🔐 Connexion

Utilisez ces identifiants pour vous connecter:

```
📧 Email: admin@store.com
🔑 Mot de passe: admin123
```

---

## 📱 Modes de fonctionnement

### 👨‍💼 Mode Administrateur (par défaut)
Cliquez sur le bouton "Client" en haut à droite pour basculer vers le mode client.

**Fonctionnalités:**
- Voir le tableau de bord avec les statistiques
- Gérer les produits (CRUD)
- Gérer les commandes et mettre à jour le stock
- Gérer les utilisateurs

### 🛍️ Mode Client
Cliquez sur le bouton "Admin" en haut à droite pour revenir au mode admin.

**Fonctionnalités:**
- Parcourir la boutique
- Ajouter des produits au panier
- Passer une commande

---

## 📊 Workflow complet

### 1. Ajouter des produits (Mode Admin)
1. Aller à "Produits"
2. Cliquer "+ Ajouter un produit"
3. Remplir le formulaire
4. Cliquer "Créer"

### 2. Acheter (Mode Client)
1. Basculer en "Mode Client"
2. Aller à "Boutique"
3. Ajouter des produits au panier
4. Cliquer "Panier"
5. Cliquer "Procéder à la commande"
6. Remplir les informations

### 3. Valider une commande (Mode Admin)
1. Basculer en "Mode Admin"
2. Aller à "Commandes"
3. Cliquer "Détails" pour voir les articles
4. Cliquer "Valider & Mise à jour stock"
   - ✅ Le stock sera automatiquement réduit

---

## 🛠️ Architecture

### Services API
Les services gèrent tous les appels API. **Aucun fetch dans les composants!**

```javascript
// Exemples d'utilisation dans les composants:
import { productService } from '../services/productService';

// Récupérer tous les produits
const products = await productService.getProducts();

// Ajouter un produit
await productService.createProduct({ name, price, ... });
```

### Contextes Global
- **AuthContext**: Gère l'utilisateur connecté et l'authentification
- **CartContext**: Gère le panier du client

```javascript
const { user, logout } = useAuth();
const { cart, addToCart } = useCart();
```

---

## 📝 Données

### db.json
Contient 3 tables:
- **users**: Utilisateurs admin (email, password)
- **products**: Catalogue de produits
- **orders**: Commandes clients

Vous pouvez modifier manuellement `db.json` ou utiliser l'interface.

---

## 🎨 Styles

- Tous les styles sont dans `src/styles/App.css`
- Design responsive
- Compatibilité mobile

---

## ❌ Résolution de problèmes

| Problème | Solution |
|----------|----------|
| Port 3001 déjà utilisé | Fermez l'autre json-server ou changez le port |
| Erreur de connexion API | Vérifiez que json-server est lancé |
| Page blanche | Vérifiez la console (F12) pour les erreurs |
| CSS ne s'applique pas | Clear cache navigateur (Ctrl+Shift+Del) |

---

## 💡 Points clés

✅ **Bonnes pratiques respectées:**
- Services API pour tous les appels
- Gestion d'état avec Contexts
- Composants réutilisables
- Code structuré et modulaire
- Gestion des erreurs
- Responsive design

---

## 📚 Fichiers importants

```
tp--3/
├── package.json           ← Dépendances et scripts
├── db.json               ← Base de données
├── vite.config.js        ← Config Vite
├── src/
│   ├── App.jsx           ← Composant principal avec routage
│   ├── main.jsx          ← Point d'entrée
│   ├── services/         ← Appels API
│   ├── context/          ← État global
│   ├── pages/            ← Pages principales
│   └── styles/           ← CSS global
└── README.md             ← Documentation complète
```

---

## 🚀 Prêt à coder!

L'application est configurée et prête à être utilisée. Vous pouvez:
- Modifier les styles dans `src/styles/App.css`
- Ajouter de nouveaux services dans `src/services/`
- Créer de nouveaux contextes dans `src/context/`
- Ajouter de nouvelles pages dans `src/pages/`

Bonne chance! 🎉
