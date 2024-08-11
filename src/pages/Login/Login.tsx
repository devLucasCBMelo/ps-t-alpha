import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../utils/fetchProductsApi";
import styles from "./Login.module.css"
import { useEffect, useState } from "react";
import { User } from "../../type";

function Login() {
  const navigate = useNavigate();

  const [userTaxNumber, setUserTaxNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [checkLoginInfos, setCheckLoginInfos] = useState(true);

  const [users, setUsers] = useState<User[]>([]);

  const isTaxNumberCPF = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(userTaxNumber)
  const isTaxNumberCNPJ = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(userTaxNumber)
  const isPasswordValid = userPassword.length > 5;

  useEffect(() => {
    if((isTaxNumberCPF || isTaxNumberCNPJ) && isPasswordValid) {
      setCheckLoginInfos(false)
    } else {
      setCheckLoginInfos(true)
    }
  }, [isTaxNumberCPF, isTaxNumberCNPJ, isPasswordValid])

  useEffect(() => {
    const usersInLocalStorage = localStorage.getItem('users');
    //console.log('Usuários no localStorage', usersInLocalStorage);

    if(usersInLocalStorage) {
      setUsers(JSON.parse(usersInLocalStorage))
    }
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const checkInStorage = users.map((user) => {
      //console.log('entrei no map')
      if(user.taxnumber == userTaxNumber && user.userpassword == userPassword){
        return true
      }
    })

    if(checkInStorage){
      alert(`Eu sou uma pessoa cadastrada`)
      await fetchLogin(userTaxNumber, userPassword)
      navigate('/products')
    } else {
      alert('Usuário ou senha incorretos')
    }
  }
  
  return (
    <div className={ styles.login_container}>
      <form 
        className={ styles.container_form}
        onSubmit={ (event) => handleLogin(event)}
      >
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          className={ styles.input_text }
          required
          onChange={ (event) => setUserTaxNumber(event.target.value)}
        />
        <input
          type="password"
          placeholder="Senha do usuário"
          className={ styles.input_password }
          required
          onChange={ (event) => setUserPassword(event.target.value)}
        />
        <button type="submit" disabled={checkLoginInfos}>Entrar</button>
      </form>

      <div className={ styles.second_container}>
        <h3>Não tem cadastro? Clique abaixo para se cadastrar</h3>
        <button onClick={ () => navigate('/register')}>Cadastre-se</button>
      </div>
    </div>
    
  )
  
}

export default Login;