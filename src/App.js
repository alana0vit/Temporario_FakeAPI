import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  async function buscarProdutos(offset) {
    const url = "https://fakestoreapi.com/products";

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setProdutos(data);
        setLoading(false);
      })
      .catch(error => setError(true));
      setLoading(false);
  }

  useEffect(() => { buscarProdutos() }, []);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error === true) {
    return <div className="erro">Erro ao conecatar com a URL, tente mais tarde...</div>;
  }

  return (
    <div className="row">

      <Header text="React Store"></Header>

      {produtos.map(produto => (<Card produto={produto} />))}
    </div>
  );
}

export default App;