import { useNavigate } from "react-router-dom";
import styles from "./RegisterProducts.module.css"
import { useState } from "react";
import { fetchRegisterProducts } from "../../utils/fetchProductsApi";

function RegisterProducts() {
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  const saveProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await fetchRegisterProducts(productName, productDescription, Number(productPrice), Number(productQuantity));

    setProductName('');
    setProductDescription('')
    setProductPrice('')
    setProductQuantity('');
  }

  return (
    <div className={ styles.register_products_container }>
      <div className={ styles.register_products_header }>
        <h1>Cadastre um produto</h1>
      </div>

      <form
        className={ styles.form_register_products }
        onSubmit={ (event) => saveProduct(event)}
      >
        <div>
          <h3>Nome do Produto:</h3>
          <input
            className={ styles.form_input_name_register_products }
            type="text"
            required
            placeholder="Digite aqui o nome do produto"
            value={ productName }
            onChange={ (event) => setProductName(event.target.value)}

          />
        </div>

        <div>
          <h3>Descrição do Produto:</h3>
          <input
            className={ styles.form_input_description_register_products }
            type="text"
            placeholder="Digite aqui a descrição do produto"
            value={ productDescription }
            onChange={ (event) => setProductDescription(event.target.value)}
          />
        </div>

        <div>
          <h3>Preço:</h3>
          <input
            className={ styles.form_input_price_register_products }
            type="number"
            required
            placeholder="Digite aqui o preço de venda do produto"
            value={ productPrice }
            onChange={ (event) => setProductPrice(event.target.value)}

          />
        </div>

        <div>
          <h3>Quantidade:</h3>
          <input
            className={ styles.form_input_quantity_register_products }
            type="number"
            required
            placeholder="Digite aqui a quantidade disponível no estoque"
            value={ productQuantity }
            onChange={ (event) => setProductQuantity(event.target.value)}

          />
        </div>

        <button type="submit">Cadastrar produto</button>
      </form>

      <button
        className={ styles.back_register_products_button }
        onClick={ () => navigate('/products')}
      >
        Voltar para Meus Produtos
      </button>

    </div>
  )
}

export default RegisterProducts;