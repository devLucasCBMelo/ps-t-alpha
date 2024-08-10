import { useNavigate } from "react-router-dom";
import { fetchLogin, fetchProducts } from "../../utils/fetchProductsApi";
import styles from "./Login.module.css"

function Login() {
  fetchProducts();
  fetchLogin();

  const navigate = useNavigate();
  
  return (
    <div className={ styles.login_container}>
      <form 
        className={ styles.container_form}
      >
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Digite seu CPF ou CNPJ"
          className={ styles.input_text }
        />
        <input
          type="password"
          placeholder="Senha do usuário"
          className={ styles.input_password }
        />
        <button type="submit">Entrar</button>
      </form>

      <div className={ styles.second_container}>
        <h3>Não tem cadastro? Clique abaixo para se cadastrar</h3>
        <button onClick={ () => navigate('/register')}>Cadastre-se</button>
      </div>
    </div>
    
  )
  
}

export default Login;