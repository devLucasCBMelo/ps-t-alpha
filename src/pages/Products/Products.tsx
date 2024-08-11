import { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { getAllProducts, getProductById } from "../../utils/fetchProductsApi";

function Products() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const [productId, setProductId] = useState('');
  const [foundedProduct, setFoundedProduct] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProductsList(allProducts.data.products);
      } catch (error) {
        console.log("Erro ao buscar produtos", error);
      }
    };

    fetchAllProducts();
  }, []);

  const findProductById = async () => {
    try {
      const result = await getProductById(Number(productId));
      setFoundedProduct(result.data.product);
    } catch (error) {
      console.log("Erro ao buscar produto", error);
    }
  };

  const handleFindProduct = () => {
    setFoundedProduct(null);
    findProductById();
  };

  return (
    <div className={styles.products_container}>
      <div className={styles.products_header}>
        <h1>Meus produtos</h1>
      </div>

      <button className={styles.register_button} onClick={() => navigate('/registerproducts')}>Cadastrar novo produto</button>

      <div>
        <input
          className={styles.find_input}
          type="text"
          placeholder="Digite o id do produto"
          value={productId}
          onChange={(event) => setProductId(event.target.value)}
        />
        <button onClick={handleFindProduct}>Buscar</button>
      </div>

      <div className={styles.products_cards}>
        {foundedProduct ? (
          <div className={styles.product_card}>
            <div>
              <p className={styles.card_id}><strong>id: </strong>{foundedProduct.id}</p>
              <p className={styles.card_name}><strong>Nome: </strong>{foundedProduct.name}</p>
              <p className={styles.card_description}><strong>Descrição: </strong>{foundedProduct.description}</p>
              <p className={styles.card_quantity}><strong>Quantidade disponível no estoque: </strong>{foundedProduct.stock}</p>
              <p className={styles.card_price}><strong>Preço: </strong>{foundedProduct.price}</p>
            </div>
          </div>
        ) : (
          productsList.map((product, index) => (
            <div key={index} className={styles.product_card}>
              <div>
                <p className={styles.card_id}><strong>id: </strong>{product.id}</p>
                <p className={styles.card_name}><strong>Nome: </strong>{product.name}</p>
                <p className={styles.card_description}><strong>Descrição: </strong>{product.description}</p>
                <p className={styles.card_quantity}><strong>Quantidade disponível no estoque: </strong>{product.stock}</p>
                <p className={styles.card_price}><strong>Preço: </strong>R$ {product.price}</p>
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
