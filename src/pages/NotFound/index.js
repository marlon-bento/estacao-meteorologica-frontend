import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">Oops! Página não encontrada.</h1>
      <p className="notfound-text">A página que você está procurando não existe.</p>
      <button className="notfound-button" onClick={handleNavigateHome}>
        Voltar para a página inicial
      </button>
    </div>
  );
};

export default NotFound;