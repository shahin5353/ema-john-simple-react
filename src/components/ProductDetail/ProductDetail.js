import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams();
    const[product,setProduct] = useState(null);
    useEffect(()=>{
        fetch('https://ema-john-node-mongo.herokuapp.com/product/'+productKey)
        .then(res =>res.json())
        .then(data => setProduct(data))
    },[productKey])
    
    return (
        <div>
            <h1 style={{textAlign:"center",color:"lightsalmon"}}>Product Detail</h1>
            {
                product &&
                <Product product={product} showCart={false}></Product>
                }
        </div>
    );
};

export default ProductDetail;