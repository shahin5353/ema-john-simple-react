import React from 'react';
import { useForm, } from 'react-hook-form';
import './Shipment.css';
import { useAuth } from '../Login/useAuth'
import { getDatabaseCart, clearCart } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';

const Shipment = () => {
  const { register, handleSubmit, errors } = useForm()
  const auth = useAuth()
  const [orderId,setOrderId] = useState(null)
  const [shipInfo,setShipInfo] = useState(null)
  const stripePromise = loadStripe('pk_test_1X8FNdv9hTiouRttcbc7vBu700Ol8LWIGV');
  const onSubmit = data => {
    setShipInfo(data)
   
  }
  const handlePlaceOrder = (payment)=>{
    const savedCart = getDatabaseCart();
    const orderDetail = { email: auth.user.email, cart: savedCart, shipment: shipInfo, payment : payment}
    fetch('https://ema-john-node-mongo.herokuapp.com/placeOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetail)
    })
      .then(res => res.json())
      .then(data => {
        setOrderId(data._id)
        clearCart();
        // window.location.href = "http://localhost:3000"

      })
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6" style={{display: shipInfo && 'none'}}>
          <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Name" />
            {errors.name && <span className="error">Name is required</span>}
            <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Email" />
            {errors.email && <span className="error">Email is required</span>}
            <input type="tel" name="phone" ref={register({ required: true })} placeholder="Phone Number" />
            {errors.phone && <span className="error">Phone is required</span>}
            <input name="AddressLine1" ref={register({ required: true })} placeholder="Address Line 1" />
            {errors.AddressLine1 && <span className="error">Address is required</span>}
            <input name="AddressLine2" ref={register} placeholder="Address Line 2 Optional" />
            <input name="city" ref={register({ required: true })} placeholder="City" />
            {errors.city && <span className="error">City is required</span>}
            <input name="country" ref={register({ required: true })} placeholder="Country" />
            {errors.country && <span className="error">Country is required</span>}
            <input name="zipcode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.zipcode && <span className="error">Zip Code is required</span>}

            <input className="main-button" type="submit" />
          </form>
        </div>
        <div className="col-md-6" style={{display: shipInfo ? 'block' : 'none'}}>
          <h3>Payment Information</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm handlePlaceOrder= {handlePlaceOrder}/>
          </Elements>
          <br/>
          {
            orderId && 
            <div>
              <h3>Thank you for shopping with us</h3>
              <p>Your order id {orderId}</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
};

export default Shipment;