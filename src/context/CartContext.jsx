import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/product";

const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cartItem, setCartItem] = useState([]);

    function addToCart(productId){
        const existing = cartItem.find((item) => item.id === productId);
        if(existing){
            const currentQuantity = existing.quantity;
            const updatedCartItem = cartItem.map((item) => item.id === productId ? { id: productId, quantity: currentQuantity + 1 } : item );
            setCartItem(updatedCartItem)
            // alert(updatedCartItem)
        } else {
            setCartItem([...cartItem, { id: productId, quantity: 1}]);
        }
    }

    function getCartItemsWithProducts(){
        return cartItem.map(item => (
            {...item, 
            product: getProductById(item.id)
    })).filter(item => item.product);
    }

    function removeFromCart(productId){
        setCartItem(cartItem.filter((item) => item.id !== productId));
    }

    function updateQuantity(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId)
        }else{
        setCartItem(
            cartItem.map((item) =>
            item.id === productId ? {...item, quantity} : item)
        )}
    }

    function getCartTotal() {
        const total = cartItem.reduce((total, item) =>{
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0)
        }, 0);
        return total;
    }

    function clearCart(){
        setCartItem([]);
    }
    return(
        <CartContext.Provider value={{ cartItem, addToCart, getCartItemsWithProducts, removeFromCart, updateQuantity, getCartTotal, clearCart}}>{children}</CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    
    return context;
}