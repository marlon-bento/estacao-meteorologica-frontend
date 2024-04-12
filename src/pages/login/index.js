import { Link } from 'react-router-dom';
import './style.css';
import './validarLogin.js'
import { handleLogin } from './validarLogin.js';
import { useState, useContext } from 'react';
import { useMutation } from "react-query";
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext.js/index.js';





function Login() {
    const [username, setUsername] = useState(''); // Estado para o username
    const [password, setPassword] = useState(''); // Estado para a senha

    const navigate = useNavigate();

    //login usado para auterar o estado logado para true
    const {login} = useContext(AuthContext);


    const mutation = useMutation(
        async (loginData) => {
            const response = await axios.post('ec2-18-116-89-63.us-east-2.compute.amazonaws.com:8080/api/v1/usuarios/login', loginData);
            return response.data;
        }
    );
    const handleLoginValid = async (username, password) => {
        try {
            const data = await mutation.mutateAsync({ username, password });
            console.log("login feito", data.username)
            return data;
            // Faça o que for necessário com os dados de retorno, como armazená-los no estado global da aplicação
        } catch (error) {
            console.error("Falha ao fazer login")
            return null;
        }
    };

    // return (
    //     <div>
    //         <input id='usernameID' type="text" placeholder="Username" />
    //         <input id='passwordID' type="password" placeholder="Password" />
    //         <button onClick={() => handleLogin(document.getElementById('usernameID').value, document.getElementById('passwordID').value)}>Login</button>
    //     </div>
    // );
    return (
        <div className='login'>

            <form className='form-login' onSubmit={(e) => handleLogin(username, setUsername, password, setPassword, handleLoginValid, navigate, login)(e)}> {/* Adicione onSubmit para lidar com a submissão */}
                <h1 className='login-cadastro'>Login:</h1>
                <input className='formulario' type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <span id='username'></span>
                <input className='formulario' type="password" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                <span id='senha'></span>
                <input className='botao-form' type="submit" value="Logar" />
                <h1 className='info-login'>Não possui login? <Link className='link-login' to='/cadastro'>Cadastre-se</Link></h1>
            </form>
        </div>
    );
}
export default Login;