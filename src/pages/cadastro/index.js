import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Cadastro() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Inicialize o useNavigate

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (!name.trim() || !username.trim() || !password.trim()) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const cadastroData = {
            name: name,
            username: username,
            password: password,
        };

        try {
            const response = await axios.post('https://estacao-meteorologica-backend.onrender.com/api/v1/usuarios/criar', cadastroData);
            
            alert('Cadastrado com sucesso!!!!');
            // Redirecione para a página de login após o cadastro bem-sucedido
            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            alert('Erro ao cadastrar. Por favor, tente novamente mais tarde.');
        }

        setName('');
        setUsername('');
        setPassword('');
    };

    return (
        <div className='login'>
            <form className='form-login' onSubmit={handleCadastro}>
                <h1 className='login-cadastro'>Cadastrar:</h1>
                <input className='formulario' type="text" placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='formulario' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='formulario' type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className='botao-form' type="submit" value="Cadastrar" />
                <h1 className='info-login'>Já possui conta? <Link className='link-login' to='/'>Logar</Link></h1>
            </form>
        </div>
    );
}

export default Cadastro;
