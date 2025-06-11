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
  });

  // 1. NOVA FUNÇÃO PARA DELETAR UM PRODUTO
  const handleDelete = (productId) => {
    // Pede confirmação ao usuário - uma boa prática para evitar exclusões acidentais
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      axios.delete(`http://127.0.0.1:8000/api/products/${productId}/`)
        .then(() => {
          alert('Produto deletado com sucesso!');
          // Atualiza a lista de produtos na tela sem precisar recarregar a página
          // O .filter() cria uma nova lista contendo apenas os produtos cujo ID é DIFERENTE do que foi deletado.
          setProducts(products.filter(p => p.id !== productId));
        })
        .catch(error => {
          console.error('Erro ao deletar o produto!', error);
          alert('Erro ao deletar o produto.');
        });
    }
  };

  return (
    <div>
      {/* Botão para adicionar produto */}
      <h1>Lista de Produtos</h1>
      <Link to="/products/new">
        <button style={{ marginBottom: '20px' }}>Adicionar Novo Produto</button>
      </Link>
      
      <table border="1" style={{ width: '80%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'd0d0d0' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Preço</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Estoque</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>R$ {product.price}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{product.stock}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                <Link to={`/products/edit/${product.id}`}>
                {/* Botão para editar */}
                  <button style={{ marginRight: '10px' }}>Editar</button>
                </Link>
                {/* Botão excluir produto */}
                <button onClick={() => handleDelete(product.id)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;