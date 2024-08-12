import { useNavigate } from "react-router-dom";
import styles from "./UpdateProduct.module.css";
import { useContext, useState } from "react";
import { fetchUpdateProducts } from "../../utils/fetchProductsApi";
import context from "../../context/appContext";

function UpdateProduct() {
  const navigate = useNavigate();

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')

  const { userToken } = useContext(context)

  const updateProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await fetchUpdateProducts(
        userToken,
        Number(productId),
        productName,
        productDescription,
        Number(productPrice),
        Number(productQuantity)
      );
  
      alert('Produto atualizado com sucesso, confira em Meus Produtos!')
    } catch (error) {
      console.log("Erro ao atualizar o produto", error);
    } finally {
      setProductId('');
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductQuantity('');
    }
  }

  return (
    <div className={ styles.update_products_container }>
      <div className={ styles.update_products_header }>
        <h1>Atualizar produto</h1>
      </div>

      <button
          className={styles.back_button}
          onClick={ () => navigate('/products')}
      >
        Voltar
      </button>

      <form
        className={ styles.form_update_products }
        onSubmit={ (event) => updateProduct(event)}
      >
        <div>
          <h3>Id do produto:</h3>
          <input
            className={ styles.form_input_id_update_products }
            type="number"
            onChange={ (event) => setProductId(event.target.value) }
            placeholder="id"
            required
            value={ productId }
          />
        </div>

        <div>
          <h3>Nome do Produto:</h3>
          <input
            className={ styles.form_input_name_update_products }
            onChange={ (event) => setProductName(event.target.value)}
            placeholder="Digite aqui o nome do produto"
            required
            type="text"
            value={ productName }
          />
        </div>

        <div>
          <h3>Descrição do Produto:</h3>
          <input
            className={ styles.form_input_description_update_products }
            type="text"
            placeholder="Digite aqui a descrição do produto"
            value={ productDescription }
            onChange={ (event) => setProductDescription(event.target.value)}
          />
        </div>

        <div>
          <h3>Preço:</h3>
          <input
            className={ styles.form_input_price_update_products }
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
            className={ styles.form_input_quantity_update_products }
            type="number"
            required
            placeholder="Digite aqui a quantidade disponível no estoque"
            value={ productQuantity }
            onChange={ (event) => setProductQuantity(event.target.value)}

          />
        </div>

        <button type="submit">Atualizar produto</button>
      </form>
    </div>
  )
}

export default UpdateProduct;
