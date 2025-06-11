// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductForm() {
  // States para cada campo do formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  // State para guardar a lista de categorias que vem da API
  const [categories, setCategories] = useState([]);

  // Hook para navegar para outra página após o submit
  const navigate = useNavigate();

  // Busca as categorias da API quando o componente carrega
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar categorias!', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o recarregamento da página

    const newProduct = {
      name,
      description,
      price,
      stock,
      category,
    };

    // Envia os dados do novo produto para a API
    axios.post('http://127.0.0.1:8000/api/products/', newProduct)
      .then(response => {
        alert('Produto criado com sucesso!');
        navigate('/products'); // Redireciona para a lista de produtos
      })
      .catch(error => {
        console.error('Erro ao criar o produto!', error);
        alert('Erro ao criar o produto. Verifique o console.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar Novo Produto</h2>
      <div>
        <label>Nome:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Preço:</label>
        <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Estoque:</label>
        <input type="number" value={stock} onChange={e => setStock(e.target.value)} required />
      </div>
      <div>
        <label>Categoria:</label>
        <select value={category} onChange={e => setCategory(e.target.value)} required>
          <option value="">Selecione uma categoria</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">Salvar Produto</button>
    </form>
  );
}

export default ProductForm;