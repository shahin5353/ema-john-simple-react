import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price} = props.product;
    
    return (
        <div style={{borderBottom:'1px solid lightgray',marginBottom:'5px',paddingBottom:'10px',marginLeft:'10%'}}>
            <h4 className="product-name"> {name} </h4>
            <small style={{color:'#b12704',fontWeight:700}}>${price}</small>
            <p>Quantity : {quantity} </p>
            <button className="main-button" onClick={()=>props.removeProduct(key)}> Remove </button>
        </div>
    );
};

export default ReviewItem;