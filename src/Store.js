import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/AuthSlice";
import categoriesReducer from "./Features/Category/CategorySlice";
import productsReducer from "./Features/Product/ProductSlice";
import ordersReducer from "./Features/Order/OrderSlice";
import wishlistsReducer from "./Features/Wishlist/WishlistSlice";
import cartReducer from "./Features/Cart/CartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        categories: categoriesReducer,
        products: productsReducer,
        wishlists: wishlistsReducer,
        orders: ordersReducer,
        cart: cartReducer,
    },
});