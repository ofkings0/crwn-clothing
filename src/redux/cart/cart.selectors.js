import { createSelector } from 'reselect';

const selectCart = state => state.cart; //this function returns cart portion of the state 

export const selectCartItems = createSelector(
  [selectCart], //array of input selector
  (cart) => cart.cartItems //function returns what we want from the selector 
)

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
    cartItems => 
      cartItems.reduce(
          (accumalatedQuantity, cartItem) => 
              accumalatedQuantity + cartItem.quantity, 
              0)
) 

export const selectCartTotal = createSelector(
  [selectCartItems],
    cartItems =>
      cartItems.reduce(
        (accumalatedTotal, cartItem) => 
          accumalatedTotal + cartItem.price*cartItem.quantity,
          0
      )
) 