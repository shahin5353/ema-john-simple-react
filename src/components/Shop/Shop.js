import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('https://ema-john-node-mongo.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
    },[])
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length){
            const previousCart = productKeys.map(key=>{
                const product = products.find(pd=> pd.key === key);
                product.quantity = savedCart[key];
                return product;
             });
             setCart(previousCart);
        }
    },[products])

    const addCartHandler = (product) => {
        const newCart = [...cart, product];
        product.quantity = 1;
        setCart(newCart);
        const count = newCart.filter(pd=>pd.key === product.key).length;
        addToDatabaseCart(product.key, count);
        if(product.key === cart.find(pd=>pd.key === product.key)) product.quantity = product.quantity+1;
    };

    return (
        <div className="flex-container">
            <div className="product-container">
                {
                    products.map(SingleProduct => <Product key={SingleProduct.key} product={SingleProduct} addCartHandler={addCartHandler} showCart={true}></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review your order</button>
                    </Link>
               </Cart>
            </div>
        </div>
    );
};

export default Shop;