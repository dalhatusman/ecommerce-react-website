import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext";

export const ProductCard = ({product}) => {
    const { addToCart, cartItem } = useCart();
    const productInCart = cartItem.find((item) => item.id === product.id);
    const productQuantity = productInCart ? `(${productInCart.quantity})`: "";
    return ( 
            <div className="product-card">
                <img src={product.image} alt={product.name} className="product-card-image" />
                <div className="product-card-content">
                    <h3 className="product-card-name">{product.name}</h3>
                    <p className="product-card-price">${product.price}</p> 
                    <div className="product-card-actions">
                        <Link className="btn btn-primary" to={`/products/${product.id}`}>View Details</Link>
                        <button className="btn btn-secondary" onClick={() => addToCart(product.id) }>
                            Add to Cart{productQuantity}
                        </button>
                    </div>
                </div>
            </div>)
}