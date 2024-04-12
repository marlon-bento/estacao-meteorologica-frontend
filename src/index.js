import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import Login from './pages/login';

import Dashboard from './pages/dashboard';
import List from './pages/list';
import Cadastro from './pages/cadastro';

import {QueryClient, QueryClientProvider} from 'react-query'
import Rotas from './routes';
import { AuthProvider } from './utils/AuthContext.js';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     
        
          <Rotas/>
        
      

    </QueryClientProvider>
  </React.StrictMode>
);

