import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentError,setPaymentError] = useState(null)
  const [paymentWay,setPaymentWay] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
      setPaymentError(error.message)
      setPaymentWay(null)
    }
    else{
      const payment = {id:paymentMethod.id, last4 :paymentMethod.card.last4}
      props.handlePlaceOrder(payment)
      setPaymentWay(paymentMethod)
      setPaymentError(null)
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <CardElement />
      <button className="my-3 btn btn-primary" type="submit" disabled={!stripe}>
        Pay
      </button>
      {
        paymentError &&
        <p className="text-danger">{paymentError}</p>
      }
       {
        paymentWay &&
        <p className="text-success">Payment Successful </p>
      }
    </form>
  );
};

export default CheckoutForm;
