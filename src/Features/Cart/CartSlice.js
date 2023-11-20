/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

const loadCartFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToLocalStorage = (cartItems) => {
  try {
    const cartData = JSON.stringify(cartItems);
    localStorage.setItem('cart', cartData);
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromLocalStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.productId === newItem.productId);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      saveCartToLocalStorage(state.items);

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userObj = JSON.parse(userDataString)

        try {
          axios.post(`${baseURL}/storeProductInCart`, {
            userId: userObj.id,
            productId: newItem.productId,
            quantity: newItem.quantity,
            productName: newItem.productName,
            productPrice: newItem.productPrice,
            productImage: newItem.productImage,
          });
        } catch (error) {
          console.error('Error updating cart in the database:', error);
        }
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
      saveCartToLocalStorage(state.items);

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userObj = JSON.parse(userDataString)

        try {
          axios.put(`${baseURL}/deleteProductFromCart`, {
            userId: userObj.id,
            productId,
          });
        } catch (error) {
          console.error('Error updating cart in the database:', error);
        }
      }
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);

      if (item) {
        item.quantity = quantity;
        saveCartToLocalStorage(state.items);

        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userObj = JSON.parse(userDataString)

          try {
            axios.put(`${baseURL}/updateProductInCart`, {
              userId: userObj.id,
              productId: productId,
              quantity: quantity,
              productName: item.productName,
              productPrice: item.productPrice,
              productImage: item.productImage,
            });
          } catch (error) {
            console.error('Error updating cart in the database:', error);
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToLocalStorage(state.items);

      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userObj = JSON.parse(userDataString)
        try {
          axios.put(`${baseURL}/clearCart`, {
            userId: userObj.id,
          });
        } catch (error) {
          console.error('Error updating cart in the database:', error);
        }
      }
    },
  },
});

export const selectCartItems = (state) => state.cart.items;

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;