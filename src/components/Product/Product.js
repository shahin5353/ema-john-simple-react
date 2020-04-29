import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import "./Product.css";
import { Link } from "react-router-dom";

const Product = props => {
  const { img, name, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div className="">
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
        <br />
        <p>
          <small>by: {seller} </small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in stock - order soon</small>
        </p>
        { props.showCart &&
        <button className="main-button" onClick={()=>props.addCartHandler(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to cart </button>
        }
      </div>
    </div>
  );
};

export default Product;
