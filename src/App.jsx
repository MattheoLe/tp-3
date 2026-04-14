import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import UsersPage from './pages/UsersPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import './styles/App.css';

function App() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [currentPage, setCurrentPage] = useState(user ? 'dashboard' : 'login');
  const [isUserMode, setIsUserMode] = useState(false);

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
    setIsUserMode(false);
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('login');
    setIsUserMode(false);
  };

  const handleOrderSubmitted = () => {
    console.log('Commande soumise avec succès!');
    setCurrentPage('shop');
  };

  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  const renderPage = () => {
    if (isUserMode) {
      // Client mode
      if (currentPage === 'shop') {
        return <ShopPage />;
      } else if (currentPage === 'cart') {
        return <CartPage onOrderSubmitted={handleOrderSubmitted} />;
      }
    } else {
      // Admin mode
      if (currentPage === 'dashboard') {
        return <DashboardPage />;
      } else if (currentPage === 'products') {
        return <ProductsPage />;
      } else if (currentPage === 'orders') {
        return <OrdersPage />;
      } else if (currentPage === 'users') {
        return <UsersPage />;
      }
    }
  };

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <h1>Gestionnaire de Magasins</h1>
          <div className="header-nav">
            {isUserMode ? (
              <>
                <nav className="nav">
                  <a
                    href="#"
                    className={`nav-link ${currentPage === 'shop' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('shop');
                    }}
                  >
                    Boutique
                  </a>
                  <a
                    href="#"
                    className={`nav-link ${currentPage === 'cart' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('cart');
                    }}
                  >
                    Panier ({cart.length})
                  </a>
                </nav>
              </>
            ) : (
              <>
                <nav className="nav">
                  <a
                    href="#"
                    className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('dashboard');
                    }}
                  >
                    Tableau de bord
                  </a>
                  <a
                    href="#"
                    className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('products');
                    }}
                  >
                    Produits
                  </a>
                  <a
                    href="#"
                    className={`nav-link ${currentPage === 'orders' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('orders');
                    }}
                  >
                    Commandes
                  </a>
                  <a
                    href="#"
                    className={`nav-link ${currentPage === 'users' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage('users');
                    }}
                  >
                    Utilisateurs
                  </a>
                </nav>
              </>
            )}
            <button
              className="btn btn-secondary btn-small"
              onClick={() => setIsUserMode(!isUserMode)}
              title={isUserMode ? 'Mode Admin' : 'Mode Client'}
            >
              {isUserMode ? '👨‍💼 Admin' : '🛍️ Client'}
            </button>
            <button className="btn btn-danger btn-small" onClick={handleLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main>
        {renderPage()}
      </main>

    </div>
  );
}

export default App;
