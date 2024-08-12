import { useContext, useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { fetchDeleteProductById, getAllProducts, getProductById } from "../../utils/fetchProductsApi";
import context from "../../context/appContext";

function Products() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [productId, setProductId] = useState('');
  const [foundedProduct, setFoundedProduct] = useState<any>(null);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const {userToken} = useContext(context)

  const hideDeleteButton = styles.card_plus_delete_button_container_invisible;
  const showDeleteButton = styles.delete_button;


  const fetchAllProducts = async () => {
    try {
      const allProducts = await getAllProducts(userToken);
      setProductsList(allProducts.data.products);
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [productsList,clicked]);

  const findProductById = async () => {
    if (!productId) {
      setFoundedProduct(null);
      fetchAllProducts();
      return;
    }

    try {
      const result = await getProductById(userToken, Number(productId));
      setFoundedProduct(result.data.product);
    } catch (error) {
      console.log("Erro ao buscar produto", error);
    }
  };


  const deleteProduct = async (id: number) => {
    try {
      await fetchDeleteProductById(userToken, id)
      
      alert("Produto deletado com sucesso!")
      await fetchAllProducts()
    } catch (error) {
      console.log("Erro ao deletar o produto", error)
    }
  }

  const changeVisibility = () => {
    if (clicked) {
      setClicked(false);

    } else {
      setClicked(true);

    }
  }

  return (
    <div className={styles.products_container}>
      <div className={styles.products_header}>
        <h1>Meus produtos</h1>
      </div>

      <div>
        <button className={styles.register_button} onClick={() => navigate('/registerproducts')}>Cadastrar novo produto</button>
        <button className={ styles.update_button } onClick={ () => navigate('/updateproducts')}>Atualizar produto</button>
        <button onClick={ () => changeVisibility() }>Deletar produto</button>
      </div>

      <div>
        <input
          className={styles.find_input}
          type="text"
          placeholder="Digite o id do produto"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
        />
        <button onClick={ () => findProductById() }>Buscar</button>
      </div>

      <div className={styles.products_cards}>
        {foundedProduct ? (
          <div
            className={ styles.card_plus_delete_button_container}
          >
            <button
              className={ styles.delete_button }
              onClick={ () => deleteProduct(foundedProduct.id)}
            >
              X
            </button>
            <div className={styles.product_card}>
              <div>
                <p className={styles.card_id}><strong>id: </strong>{foundedProduct.id}</p>
                <p className={styles.card_name}><strong>Nome: </strong>{foundedProduct.name}</p>
                <p className={styles.card_description}><strong>Descrição: </strong>{foundedProduct.description}</p>
                <p className={styles.card_quantity}><strong>Quantidade no estoque: </strong>{foundedProduct.stock}</p>
                <p className={styles.card_price}><strong>Preço: </strong>{foundedProduct.price}</p>
              </div>
            </div>
          </div>
        ) : (
          productsList.map((product, index) => (
            <div
              className={ styles.card_plus_delete_button_container}
              key={index}
            >
              <button
                className={ clicked ? showDeleteButton: hideDeleteButton }
                onClick={ () => deleteProduct(product.id)}
              >
                X
              </button>
              <div className={ styles.product_card_container}>
                <div className={styles.product_card}>
                  <div>
                    <p className={styles.card_id}><strong>id: </strong>{product.id}</p>
                    <p className={styles.card_name}><strong>Nome: </strong>{product.name}</p>
                    <p className={styles.card_description}><strong>Descrição: </strong>{product.description}</p>
                    <p className={styles.card_quantity}><strong>Quantidade no estoque: </strong>{product.stock}</p>
                    <p className={styles.card_price}><strong>Preço: </strong>R$ {product.price}</p>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      <button onClick={() => navigate('/')}>Sair</button>
    </div>
  );
}

export default Products;
