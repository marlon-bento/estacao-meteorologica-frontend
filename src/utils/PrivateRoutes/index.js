import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.js';
import { useContext } from 'react';

const PrivateRoutes = () => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Carregando...</div>; // esperando validar se já logou
    }

    return auth.token ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default PrivateRoutes;