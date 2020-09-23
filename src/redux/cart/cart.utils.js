export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find( //returns the first cartItem that matches the condition
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem => //map returns an array
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  } //else {
    return [...cartItems, { ...cartItemToAdd, quantity: 1}]
  //}
}