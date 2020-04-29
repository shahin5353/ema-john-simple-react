import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total,product) => total + product.price * product.quantity,0);
    const formatNumber = (num) => Number(num.toFixed(2));
    let shipping = 0;
    if(total>=50) shipping = 0;
    else if(total<50 && total >0) shipping = 4.99;
    const tax = total/10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h3>Order Summary</h3>
                <h4>Items Ordered:{cart.length}</h4>
                <br/>
                <p> <small>item price: ${formatNumber(total)}</small> </p>
                <p> <small> Shipping & Handling <i>(order upto $50 for free shipping)</i> : ${formatNumber(shipping)} </small></p>
                <p> <small> Total before Tax: ${formatNumber(total + shipping)} </small></p>
                <p> <small> Estimated Tax: ${formatNumber(tax)} </small></p>
                <h4>Order Total: {formatNumber(grandTotal)}</h4>
                {
                    props.children
                }
        </div>
    );
};

export default Cart;