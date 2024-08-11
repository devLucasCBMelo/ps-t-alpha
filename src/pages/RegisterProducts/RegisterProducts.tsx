import { useNavigate } from "react-router-dom";
import styles from "./RegisterProducts.module.css"

function RegisterProducts() {
  const navigate = useNavigate();

  return (
    <div className={ styles.register_products_container }>
      <div className={ styles.register_products_header }>
        <h1>Cadastre um produto</h1>
      </div>

      <form className={ styles.form_register_products }>
        <div>
          <h3>Nome do Produto:</h3>
          <input
            className={ styles.form_input_name_register_products }
            type="text"
            required
            placeholder="Digite aqui o nome do produto"
          />
        </div>

        <div>
          <h3>Descrição do Produto:</h3>
          <input
            className={ styles.form_input_description_register_products }
            type="text"
            placeholder="Digite aqui a descrição do produto"
          />
        </div>

        <div>
          <h3>Preço:</h3>
          <input
            className={ styles.form_input_price_register_products }
            type="number"
            required
            placeholder="Digite aqui o preço de venda do produto"
          />
        </div>

        <div>
          <h3>Quantidade:</h3>
          <input
            className={ styles.form_input_quantity_register_products }
            type="number"
            required
            placeholder="Digite aqui a quantidade disponível no estoque"
          />
        </div>

        <button type="submit">Cadastrar produto</button>
      </form>

      <button
        className={ styles.back_register_products_button }
        onClick={ () => navigate('/products')}
      >
        Voltar
      </button>

    </div>
  )
}

export default RegisterProducts;