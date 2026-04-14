import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';

const ShopPage = ({ onCheckout }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des produits');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (product.quantity > 0) {
      addToCart(product, 1);
      setSuccessMessage(`${product.name} ajouté au panier`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  if (isLoading) {
    return <div className="loading"><div className="spinner"></div>Chargement des produits...</div>;
  }

  return (
    <div className="container">
      <h2>Boutique</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <div className="product-price">{product.price.toFixed(2)} €</div>
              <p className="product-description">{product.description}</p>
              <div className="product-quantity">
                {product.quantity > 0 ? (
                  <span style={{ color: '#27ae60' }}>✓ En stock ({product.quantity})</span>
                ) : (
                  <span style={{ color: '#e74c3c' }}>✗ Rupture de stock</span>
                )}
              </div>
              <div className="product-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quantity <= 0}
                  style={{ flex: 1 }}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
