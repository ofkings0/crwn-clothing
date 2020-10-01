import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey= 'pk_test_51DJkq1AMvC2Mc7b5JZhqNojiSrtT40y9JvFnuYFaQ7tgZntdDKbpjMTx0uP7sVrU5H4TzjDeeolqzTOVvXVWI0KC00Bfg0Tj7F';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful')
  }

  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Ltd'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description= {`Your total is $${price}`}
      amount= {priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />

  )
}

export default StripeCheckoutButton;