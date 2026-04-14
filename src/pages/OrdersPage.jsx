import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderService.getOrders();
      setOrders(data);
      setError('');
    } catch (err) {
      setError('Erreur lors du chargement des commandes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const order = orders.find((o) => o.id === orderId);

      // If changing to completed, update stock
      if (newStatus === 'completed' && order.status !== 'completed') {
        for (const item of order.items) {
          const product = await productService.getProduct(item.productId);
          const newQuantity = Math.max(0, product.quantity - item.quantity);
          await productService.updateProduct(item.productId, {
            ...product,
            quantity: newQuantity,
          });
        }
      }

      await orderService.updateOrderStatus(orderId, newStatus);
      setSuccessMessage('Commande mise à jour avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
      loadOrders();
    } catch (err) {
      setError('Erreur lors de la mise à jour de la commande');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'badge-completed';
      case 'pending':
        return 'badge-pending';
      case 'processing':
        return 'badge-processing';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return '';
    }
  };

  const getStatusText = (status) => {
    const statuses = {
      pending: 'En attente',
      processing: 'En cours de traitement',
      completed: 'Terminée',
      cancelled: 'Annulée',
    };
    return statuses[status] || status;
  };

  if (isLoading) {
    return <div className="loading"><div className="spinner"></div>Chargement des commandes...</div>;
  }

  return (
    <div className="container">
      <h2>Gestion des Commandes</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Email</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Articles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr>
                  <td>#{order.id}</td>
                  <td>{order.firstName} {order.lastName}</td>
                  <td>{order.email}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td>{order.createdAt}</td>
                  <td>{order.items.length} article(s)</td>
                  <td>
                    <button
                      className="btn btn-primary btn-small"
                      onClick={() =>
                        setExpandedOrder(expandedOrder === order.id ? null : order.id)
                      }
                    >
                      {expandedOrder === order.id ? 'Masquer' : 'Détails'}
                    </button>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr>
                    <td colSpan="7">
                      <div style={{ padding: '15px', background: '#f9f9f9' }}>
                        <h4>Articles de la commande</h4>
                        <table className="table" style={{ marginBottom: '15px' }}>
                          <thead>
                            <tr>
                              <th>Produit ID</th>
                              <th>Quantité</th>
                              <th>Prix unitaire</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, idx) => (
                              <tr key={idx}>
                                <td>#{item.productId}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toFixed(2)} €</td>
                                <td>{(item.price * item.quantity).toFixed(2)} €</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div style={{ marginTop: '15px' }}>
                          <p><strong>Total commande:</strong> {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)} €</p>
                          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                            {order.status !== 'completed' && (
                              <button
                                className="btn btn-success btn-small"
                                onClick={() => handleStatusChange(order.id, 'completed')}
                              >
                                Valider & Mise à jour stock
                              </button>
                            )}
                            {order.status !== 'cancelled' && order.status !== 'completed' && (
                              <button
                                className="btn btn-danger btn-small"
                                onClick={() => handleStatusChange(order.id, 'cancelled')}
                              >
                                Annuler
                              </button>
                            )}
                            {order.status === 'pending' && (
                              <button
                                className="btn btn-primary btn-small"
                                onClick={() => handleStatusChange(order.id, 'processing')}
                              >
                                Marquer en cours
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p>Aucune commande disponible</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
