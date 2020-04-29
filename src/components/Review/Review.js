import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const auth = useAuth();
    const removeProduct= (productKey)=>{
        const newCart = cart.filter(product=>product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://ema-john-node-mongo.herokuapp.com/getProductByKey',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(productKeys)
        })
        .then(res=>res.json())
        .then(data=>{
            const cartProducts= productKeys.map(key=>{
                const product = data.find(product => product.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        })
        
    },[]);
   
    return (
        <div className="flex-container">
           <div className="product-container">
                {
                    cart.map(product => <ReviewItem key={product.key} removeProduct={removeProduct} product = {product}></ReviewItem>)
                }
               {
                   !cart.length && <h1>Your cart is empty. <Link to="/shop">Keep Shopping</Link> </h1>
               }
           </div>
           <div className="cart-container">
               <Cart cart={cart}>
                    {/* <button onClick={placeOrder} className="main-button">Place Order</button> */}
                    <Link to="/shipment">
                        {
                            auth.user ?
                            <button className="main-button"> Proceed To Checkout </button>
                            :
                            <button className="main-button"> Login To Proceed </button>
                        }
                    </Link>
               </Cart>
           </div>
        </div>
        
    );
};

export default Review;