import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"

function RegisterUser() {
  const navigate = useNavigate()

  return (
    <div className={ styles.register_container } >
      <h1>Cadastro</h1>
      <button
        className={styles.back_button}
        onClick={ () => navigate('/')}
      >
        Voltar
      </button>

      <div>
        <h3>Nome completo:</h3>
        <input
          type="text"
          placeholder="Nome"
        />
      </div>

      <div>
        <h3>CPF ou CNPJ:</h3>
        <input type="text" placeholder="taxNumber" />
      </div>

      <div>
        <h3>Email:</h3>
        <input type="email" placeholder="Email" />
      </div>

      <div>
        <h3>Telefone:</h3>
        <input type="text" placeholder="Telefone" />
      </div>

      <div>
        <h3>Senha:</h3>
        <input type="text" placeholder="Senha" />
      </div>

      <button>Registrar</button>
    </div>
  )
}

export default RegisterUser;