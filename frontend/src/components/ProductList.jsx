// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos o axios para fazer a "ponte" com a API
import {Link} from 'react-router-dom'; // Importamos o Link para navegação

function ProductList() {
  // 'useState' cria um "estado" para guardar nossa lista de produtos.
  // Começa como um array vazio [].
  const [products, setProducts] = useState([]);

  // 'useEffect' é um gancho que executa um código depois que o componente é renderizado.
  // É o lugar perfeito para buscar dados de uma API.
  useEffect(() => {
    // Usamos o axios para fazer uma requisição GET para a nossa API Django.
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        // Se a requisição for um sucesso, atualizamos o estado 'products' com os dados recebidos.
        console.log('Dados recebidos da API:', response.data); // Ótimo para depurar!
        setProducts(response.data);
      })
      .catch(error => {
        // Se der erro, mostramos no console do navegador.
        console.error('Houve um erro ao buscar os produtos!', error);
      });
  }, []); // O array vazio [] como segundo argumento faz com que o useEffect execute apenas uma vez, quando o componente é montado.

  // O 'return' define o que será renderizado na tela (o HTML).
  return (
    
    <div>
      <h1>Lista de Produtos</h1>
      {/* 2. ADICIONE ESTE BOTÃO/LINK */}
      <Link to="/products/new">
        <button style={{ marginBottom: '20px' }}>Adicionar Novo Produto</button>
      </Link>
      <table border="1" style={{ width: '90%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#0d0d0d' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Preço</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {/* Usamos o .map() para percorrer a lista de produtos e criar uma linha <tr> para cada um. */}
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>R$ {product.price}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;