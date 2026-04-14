import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    quantity: '',
  });

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

  const handleAddClick = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '', description: '', quantity: '' });
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      quantity: product.quantity,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || '' : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, formData);
        setError('');
      } else {
        await productService.createProduct(formData);
        setError('');
      }
      setIsModalOpen(false);
      loadProducts();
    } catch (err) {
      setError('Erreur lors de la sauvegarde du produit');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit?')) {
      try {
        await productService.deleteProduct(id);
        loadProducts();
      } catch (err) {
        setError('Erreur lors de la suppression du produit');
      }
    }
  };

  if (isLoading) {
    return <div className="loading"><div className="spinner"></div>Chargement des produits...</div>;
  }

  return (
    <div className="container">
      <div className="action-bar">
        <div className="action-bar-left">
          <h2>Gestion des Produits</h2>
        </div>
        <div className="action-bar-right">
          <button className="btn btn-success" onClick={handleAddClick}>+ Ajouter un produit</button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price.toFixed(2)} €</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => handleEditClick(product)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => handleDelete(product.id)}
                    style={{ marginLeft: '5px' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal open">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Prix (€) *</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Quantité en stock *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-success">
                  {editingProduct ? 'Mise à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
