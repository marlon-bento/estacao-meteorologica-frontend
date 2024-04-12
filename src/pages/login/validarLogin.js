import Cookies from 'js-cookie';

export const handleLogin = (username, setUsername, password, setPassword, handleLoginValid, navigate, login) => async (e) =>{
    
    
    
    
    e.preventDefault(); // Impede o comportamento padrão de envio do formulário
    document.getElementById('username').textContent = '';
    document.getElementById('senha').textContent = '';

    // Verifica se o username e a senha estão preenchidos
    if (!username.trim()) {
        document.getElementById('username').textContent = 'Por favor, informe o username.';
        if (!password.trim()) {
            document.getElementById('senha').textContent = 'Por favor, informe a senha.';
            return;
        }
        return;
    }

    if (!password.trim()) {
        document.getElementById('senha').textContent = 'Por favor, informe a senha.';
        if (!username.trim()) {
            document.getElementById('username').textContent = 'Por favor, informe o username.';
            return;
        }
        return;
    }

    // Se ambos os campos estiverem preenchidos, você pode prosseguir com a lógica de autenticação ou fazer o que desejar com os valores do username e da senha.
    const valorUsername = username;
    const valorPassword = password;
    console.log('Username:', valorUsername);
    console.log('Password:', valorPassword);
    


    const data = await  handleLoginValid(username,password);
    // Lógica de autenticação (exemplo simples)
    if (data !== null) {
        console.log('Login bem-sucedido!', data.username);

        // Salvar o cookie com o nome "login" e valor true
        Cookies.set('login', true);
        Cookies.set('name', data.name);

        // Também pode salvar o ID do usuário no cookie
        Cookies.set('userId', data.id);

       
            
        login(); // Isso atualizará o estado do token para true
      

        navigate('/',{
            replace: true 
        });
    } else {
        console.log('Credenciais inválidas.');
        alert('não conseguiu fazer login')
    }
    

    // Limpa os campos após a submissão
    setUsername('');
    setPassword('');
};




