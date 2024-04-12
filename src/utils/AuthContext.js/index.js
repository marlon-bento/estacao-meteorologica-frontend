import React, { createContext, useState, useEffect  } from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: false });
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true); // Estado de carregamento
    
    
    const login = () => {
        // Lógica para autenticar o usuário e obter o token
        setAuth({ token: true });
        setLoading(false); // Marca o carregamento como concluído após o login
    };

    const logout = () => {
        Cookies.remove('login');
        Cookies.remove('name');
        Cookies.remove('userId');
        // Lógica para fazer logout e remover o token
        setAuth({ token: false });
    };

    useEffect(() => {
        const cookieValue = Cookies.get('login'); // Obtém o valor do cookie "login"
        if (cookieValue === 'true' && !auth.token) { // Verifica se o usuário não está autenticado
            setAuth({ token: true }); // Define o estado como autenticado se o cookie existir e tiver valor true
            setLoading(false); // Marca o carregamento como concluído após a verificação do cookie

            // Verifica a URL atual antes de navegar para a dashboard
            const currentPath = window.location.pathname;
            if (currentPath === '/login' || currentPath === '/cadastro') {
                navigate('/', { replace: true });
            }
        } else {
            setLoading(false); // Marca o carregamento como concluído mesmo se não houver cookie ou token
        }
    }, [auth.token, navigate]); // Adicionamos navigate como dependência para evitar loops infinitos

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};