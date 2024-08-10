import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"
import { useEffect, useState } from "react";
import { User } from "../../type";
import { fetchRegister } from "../../utils/fetchProductsApi";

function RegisterUser() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [userTaxNumber, setUserTaxNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersInLocalStorage = localStorage.getItem('@users');
    //console.log('Usuários no localStorage', usersInLocalStorage);

    if(usersInLocalStorage) {
      setUsers(JSON.parse(usersInLocalStorage))
    }
  }, []);

  useEffect(() => {
    if(users.length > 0) {
      localStorage.setItem('@users', JSON.stringify(users))
    }
  }, [users])

  const saveUserOnLocalStorage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newUser: User = { username: userName, taxnumber: userTaxNumber, useremail: userEmail, userphone: userPhone, userpassword: userPassword }

    setUsers([...users, newUser])
    setUserName('');
    setUserTaxNumber('');
    setUserEmail('');
    setUserPhone('');
    setUserPassword('');

    await fetchRegister(userName, userTaxNumber, userEmail, userPhone, userPassword)

    navigate('/')
  }

  return (
    <div className={ styles.register_container } >
      <h1>Cadastro</h1>
      <button
        className={styles.back_button}
        onClick={ () => navigate('/')}
      >
        Voltar
      </button>

      <form onSubmit={ (event) => saveUserOnLocalStorage(event) }>
        <div>
          <h3>Nome completo:</h3>
          <input
            type="text"
            placeholder="Nome"
            value={ userName }
            onChange={ (event) => setUserName(event.target.value)}
          />
        </div>

        <div>
          <h3>CPF ou CNPJ:</h3>
          <input
            type="text"
            placeholder="taxNumber"
            value={ userTaxNumber }
            onChange={ (event) => setUserTaxNumber(event.target.value)}
          />
        </div>

        <div>
          <h3>Email:</h3>
          <input
            type="email"
            placeholder="Email"
            value={ userEmail }
            onChange={ (event) => setUserEmail(event.target.value)}
          />
        </div>

        <div>
          <h3>Telefone:</h3>
          <input
            type="text"
            placeholder="Telefone"
            value={ userPhone }
            onChange={ (event) => setUserPhone(event.target.value)}
          />
        </div>

        <div>
          <h3>Senha:</h3>
          <input
            type="text"
            placeholder="Senha"
            value={ userPassword }
            onChange={ (event) => setUserPassword(event.target.value)}
          />
        </div>

        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}

export default RegisterUser;