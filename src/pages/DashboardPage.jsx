import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';
import { userService } from '../services/userService';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    pendingOrdersCount: 0,
    usersCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      const [products, orders, users] = await Promise.all([
        productService.getProducts(),
        orderService.getOrders(),
        userService.getUsers(),
      ]);

      setStats({
        productsCount: products.length,
        ordersCount: orders.length,
        pendingOrdersCount: orders.filter((o) => o.status === 'pending').length,
        usersCount: users.length,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading"><div className="spinner"></div>Chargement.....</div>;
  }

  return (
    <div className="container">
      <h1>Tableau de bord</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div className="card">
          <div className="card-header">
            <h3>Produits</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '30px', fontSize: '48px', color: '#3498db' }}>
            {stats.productsCount}
          </div>
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Produits disponibles</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Commandes totales</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '30px', fontSize: '48px', color: '#27ae60' }}>
            {stats.ordersCount}
          </div>
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Commandes enregistrées</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Commandes en attente</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '30px', fontSize: '48px', color: '#f39c12' }}>
            {stats.pendingOrdersCount}
          </div>
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>À traiter</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Utilisateurs</h3>
          </div>
          <div style={{ textAlign: 'center', padding: '30px', fontSize: '48px', color: '#9b59b6' }}>
            {stats.usersCount}
          </div>
          <p style={{ textAlign: 'center', color: '#7f8c8d' }}>Utilisateurs du système</p>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
