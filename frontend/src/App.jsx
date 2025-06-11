// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList'; // Listagem de itens em estoque
import ProductForm from './components/ProductForm'; // Formulario para adição de itens 


function App() {
  return (
    // O <Router> envolve toda a nossa aplicação para habilitar a navegação.
    <Router>
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px', textDecoration: 'none' }}>Home</Link>
          <Link to="/products" style={{ textDecoration: 'none' }}>Produtos</Link>
        </nav>

        <hr />

        <main style={{ marginTop: '20px' }}>
          {/* O <Routes> define as áreas onde o conteúdo das rotas será renderizado. */}
          <Routes>
            {/* Quando a URL for "/", mostre este elemento h2. */}
            <Route path="/" element={<h2>Bem-vindo ao Sistema PDV</h2>} />
            {/* Quando a URL for "/products", mostre nosso componente ProductList. */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/edit/:productId" element={<ProductForm />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;