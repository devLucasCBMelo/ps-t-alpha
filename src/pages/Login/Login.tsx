import styles from "./Login.module.css"

function Login() {
  return (
    <form 
      className={ styles.container_form}>
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
  )
  
}

export default Login;