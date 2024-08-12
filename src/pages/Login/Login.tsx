import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../utils/fetchProductsApi";
import styles from "./Login.module.css"
import { useContext, useEffect, useState } from "react";
import context from "../../context/appContext";
import Footer from "../../components/Footer/Footer";

function Login() {
  const navigate = useNavigate();

  const [userTaxNumber, setUserTaxNumber] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [checkLoginInfos, setCheckLoginInfos] = useState(true);

  const { setUserToken } = useContext(context)

  //const isTaxNumberCPF = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(userTaxNumber)
  //const isTaxNumberCNPJ = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(userTaxNumber)
  const isPasswordValid = userPassword.length > 5;

  useEffect(() => {
    if(isPasswordValid) {
      setCheckLoginInfos(false)
    } else {
      setCheckLoginInfos(true)
    }
  }, [isPasswordValid])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      const responseAPI = await fetchLogin(userTaxNumber, userPassword)
      const token = responseAPI.data.token
      setUserToken(token)
      if (responseAPI.success) {
        navigate('/products')
      } else {
        alert(responseAPI.message || "Usuário ou senha inválidos!")
      }
    } catch (error) {
      console.log("Erro ao tentar fazer login", error)
      alert("Usuário ou senha inválidos")
    } 
    
  }
  
  return (
    <>
      <div className={ styles.login_header }>
        <h1>ESTOQUE DE PRODUTOS T-ALPHA</h1>
      </div>

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
          <button
            type="submit"
            disabled={checkLoginInfos}
          >
            Entrar
          </button>

        </form>

        <div className={ styles.second_container}>
          <h3>Ainda não tem cadastro? </h3>
          <button
          className={ styles.register_button }
            onClick={ () => navigate('/register')}
          >
            Cadastre-se
          </button>
        </div>
      </div>

      <Footer />
    </>
    
  )
  
}

export default Login;