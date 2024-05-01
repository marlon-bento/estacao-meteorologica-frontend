import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Cadastro() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado para controlar o envio do formulário
    const navigate = useNavigate(); // Inicialize o useNavigate

    const handleCadastro = async (e) => {
        e.preventDefault();
    
        if (!name.trim() || !username.trim() || !password.trim() || isSubmitting) {
            // Verifique se já está enviando o formulário antes de permitir o envio novamente
            return;
        }
    
        setIsSubmitting(true); // Marque como enviando
    
        const cadastroData = {
            name: name,
            username: username,
            password: password,
        };
    
        try {
            const response = await axios.post('https://estacao-meteorologica-backend.onrender.com/api/v1/usuarios/criar', cadastroData, {
                timeout: 10000 // Tempo limite em milissegundos (10 segundos)
            });
            
            alert('Cadastrado com sucesso!!!!');
            // Redirecione para a página de login após o cadastro bem-sucedido
            navigate('/login');
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setIsSubmitting(false); // Resetar o estado para permitir novo envio
            setName('');
            setUsername('');
            setPassword('');
            if (error.code === 'ECONNABORTED') {
                alert('Tempo limite excedido. O serviço de cadastro está indisponível no momento. Por favor, tente novamente mais tarde.');
            } else if (error.response && error.response.status === 404) {
                alert('Não foi possível conectar ao serviço de cadastro. Por favor, tente novamente mais tarde.');
            } else {
                alert('Erro ao cadastrar. Por favor, tente novamente mais tarde.');
            }
        }
    };
    

    return (
        <div className='login'>
            <form className='form-login' onSubmit={handleCadastro}>
                <h1 className='login-cadastro'>Cadastrar:</h1>
                <input className='formulario' type="text" placeholder='Nome' value={name} onChange={(e) => setName(e.target.value)} />
                <input className='formulario' type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input className='formulario' type="password" placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className='botao-form' type="submit" value={isSubmitting ? 'Enviando...' : 'Cadastrar'} disabled={isSubmitting} />
                {/* Desabilite o botão enquanto estiver enviando */}
                <h1 className='info-login'>Já possui conta? <Link className='link-login' to='/'>Logar</Link></h1>
            </form>
        </div>
    );
}

export default Cadastro;
