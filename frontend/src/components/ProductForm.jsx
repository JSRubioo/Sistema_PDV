// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ProductForm() {
  // O hook useParams pega os parâmetros da URL, como o :productId
  const { productId } = useParams(); 
  
  // States para o formulário
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // O useEffect agora tem uma lógica mais complexa
  useEffect(() => {
    // 1. Busca a lista de categorias (sempre acontece)
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Erro ao buscar categorias!', error));

    // 2. Se houver um productId na URL (estamos em modo de edição)
    if (productId) {
      // Busca os dados do produto específico
      axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
        .then(response => {
          // Preenche os campos do formulário com os dados recebidos
          const product = response.data;
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setStock(product.stock);
          setCategory(product.category);
        })
        .catch(error => console.error('Erro ao buscar o produto!', error));
    }
  }, [productId]); // O useEffect agora depende do productId. Ele re-executará se o ID na URL mudar.

  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = { name, description, price, stock, category };

    // Se temos um productId, atualizamos (PUT). Senão, criamos (POST).
    if (productId) {
      axios.put(`http://127.0.0.1:8000/api/products/${productId}/`, productData)
        .then(() => {
          alert('Produto atualizado com sucesso!');
          navigate('/products');
        })
        .catch(error => console.error('Erro ao atualizar produto!', error));
    } else {
      axios.post('http://127.0.0.1:8000/api/products/', productData)
        .then(() => {
          alert('Produto criado com sucesso!');
          navigate('/products');
        })
        .catch(error => console.error('Erro ao criar produto!', error));
    }
  };

  return (
    // O JSX do formulário continua o mesmo, só mudamos o título
    <form onSubmit={handleSubmit}>
      <h2>{productId ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
      {/* ... todos os seus inputs e labels continuam aqui, sem alteração ... */}
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