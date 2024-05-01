import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import List from '../pages/list';
import Cadastro from '../pages/cadastro';
import NotFound from '../pages/NotFound';

import PrivateRoutes from '../utils/PrivateRoutes';
import { AuthProvider } from '../utils/AuthContext.js';
export default function Rotas() {

    return (
        <BrowserRouter>
            {/*o Auth provider tem a lógica de login que vai ser usada globalmente nas aplicações*/}
            <AuthProvider>
                <Routes>
                    
                    
                        <Route path='/login' element={<Login />} />

                        <Route path='/cadastro' element={<Cadastro />} />

                        {/*rotas privadas*/}
                        <Route element={<PrivateRoutes/>}>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/list' element={<List />} />
                        </Route>




                        <Route path='*' element={<NotFound />} />
                    
                </Routes>
            </AuthProvider>
          

        </BrowserRouter>

    );

}