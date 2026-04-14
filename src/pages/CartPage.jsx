import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';

const CartPage = ({ onOrderSubmitted }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const order = {
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        items: cart.map((item) => ({
          id: item.productId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      await orderService.createOrder(order);
      clearCart();
      setIsCheckoutOpen(false);
      setFormData({ firstName: '', lastName: '', email: '' });
      onOrderSubmitted && onOrderSubmitted();
    } catch (err) {
      setError('Erreur lors de la soumission de la commande');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0 && !isCheckoutOpen) {
    return (
      <div className="container">
        <h2>Panier</h2>
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <p>Votre panier est vide</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Panier</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Produit</th>
              <th>Prix</th>
              <th>Quantité</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.productId}>
                <td>{item.name}</td>
                <td>{item.price.toFixed(2)} €</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                    style={{ width: '60px', padding: '5px' }}
                  />
                </td>
                <td>{(item.price * item.quantity).toFixed(2)} €</td>
                <td>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: '20px', textAlign: 'right', paddingRight: '15px' }}>
          <h3>Total: {getTotalPrice().toFixed(2)} €</h3>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingRight: '15px', paddingBottom: '15px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => clearCart()}
          >
            Vider le panier
          </button>
          <button
            className="btn btn-success"
            onClick={() => setIsCheckoutOpen(true)}
          >
            Procéder à la commande
          </button>
        </div>
      </div>

      {isCheckoutOpen && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Finaliser la commande</h2>
              <button className="modal-close" onClick={() => setIsCheckoutOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label>Prénom *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="card" style={{ marginTop: '20px', background: '#f9f9f9' }}>
                <h3>Résumé de la commande</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.productId}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price.toFixed(2)} €</td>
                        <td>{(item.price * item.quantity).toFixed(2)} €</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ textAlign: 'right', padding: '15px' }}>
                  <h3>Total: {getTotalPrice().toFixed(2)} €</h3>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsCheckoutOpen(false)} disabled={isLoading}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-success" disabled={isLoading}>
                  {isLoading ? 'Traitement...' : 'Soumettre la commande'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
