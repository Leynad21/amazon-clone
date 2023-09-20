import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    products: [],
    productsNumber: 0
}


export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // check if product is in product array
            const addProductExists = state.products.find((product) => product.id === action.payload.id)
            if (addProductExists) {
                addProductExists.quantity += parseInt(action.payload.quantity)
            } else {
                state.products.push({ ...action.payload, quantity: parseInt(action.payload.quantity) })
            }
            state.productsNumber = state.productsNumber + parseInt(action.payload.quantity)
        },
        removeFromCart: (state, action) => {
            // find product removing from the array
            const productToRemove = state.products.find((product) => product.id === action.payload)

            // remove the quantity from product number
            state.productsNumber = state.productsNumber - productToRemove.quantity

            // find the index of the product removing
            const index = state.products.findIndex((product) => product.id === action.payload)

            // remove from the array
            state.products.splice(index, 1)
        },
        increaseProductQuantity: (state, action) => {
            // find the product
            const product = state.products.find((product) => product.id === action.payload)

            // increase quantity by one
            product.quantity += 1

            state.productsNumber = state.productsNumber + 1
        },
        decreaseProductQuantity: (state, action) => {
            // find the product
            const product = state.products.find((product) => product.id === action.payload)

            // check if quantity is more than 0

            if (product.quantity > 1) {
                // decrease quantity by one
                product.quantity -= 1
                state.productsNumber = state.productsNumber - 1
            } else {
                // Dispatch the removeFromCart action with the product ID as payload
                state.productsNumber -= 1; // Decrease the total products count
                const index = state.products.findIndex((product) => product.id === action.payload);
                state.products.splice(index, 1);
            }
        }
    }
})




export const { addToCart, removeFromCart, increaseProductQuantity, decreaseProductQuantity } = cartSlice.actions

export default cartSlice.reducer