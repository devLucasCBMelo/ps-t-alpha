import { useEffect, useState } from "react";
import styles from "./Product.module.css"
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../utils/fetchProductsApi";

function Products() {
  const [productsList, setProductsList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const allProducts = await getAllProducts()
        setProductsList(allProducts.data.products)
      } catch (error) {
        console.log("Erro ao buscar produtos", error);
      }
    }

    fetchAllProducts()
  }, []);

  return (
    <div className={ styles.products_container}>
      <div className={ styles.products_header }>
        <h1>Meus produtos</h1>
      </div>

      <button className={ styles.register_button } onClick={ () => navigate('/registerproducts')}>Cadastrar novo produto</button>

      <div className={ styles.products_cards}>
        {productsList.map((product, index) => (
          <div key={index} className={ styles.product_card}>
            <div>
              <p className={ styles.card_id}>id: {product.id}</p>
              <p className={ styles.card_name}>nome: {product.name}</p>
              <p className={ styles.card_quantity}>Quantidade disponível no estoque: {product.available_quantity}</p>
              <p className={ styles.card_price}>preço: {product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')}>Sair</button>
    </div>
    
  )
}

export default Products;