import { Link } from 'react-router-dom';
import './style.css';
function Cadastro (){
    return(
        <div className='login'>
            
            <form className='form-login' action="">
                <h1 className='login-cadastro'>Cadastrar:</h1>
                <input className='formulario' type="text" placeholder='nome' />
                <input className='formulario' type="text" placeholder='username' />
                <input className='formulario' type="password" placeholder='senha' />
                <input className='botao-form' type="submit" value="Cadastrar" />
                <h1 className='info-login'>Já possui conta?  <Link className='link-login' to='/'>Logar</Link></h1>
            </form>
        </div>
    );
}
export default Cadastro;