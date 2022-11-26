import { SELECTED_STORE, SELECTED_CATEGORY, ITEM_ADDED, ITEM_REMOVED, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from "./types";


export const selectedStore = (store) => async dispatch => {
    try {
        dispatch({
            type: SELECTED_STORE,
            payload: store
        })
    } catch (err) {
        console.log(err)
    }
}

export const selectedCategory = (category) => async dispatch => {
    try {
        dispatch({
            type: SELECTED_CATEGORY,
            payload: category
        })
    } catch (err) {
        console.log(err)
    }
}

export const addItemToCart = (product) => async dispatch => {
    try {
        dispatch({
            type: ITEM_ADDED,
            payload: product
        })
    } catch (err) {
        console.log(err)
    }
}

export const removeItemFromCart = (product) => async dispatch => {
    try {
        dispatch({
            type: ITEM_REMOVED,
            payload: product
        })
    } catch (err) {
        console.log(err)
    }
}

export const increaseItemQuantity = (product) => async dispatch => {
    try{
        dispatch({
            type:INCREASE_QUANTITY,
            payload:product
        })
    }catch(err) {
        console.log(err)
    }
}

export const decreaseItemQuantity = (product) => async dispatch => {
    try{
        dispatch({
            type:DECREASE_QUANTITY,
            payload:product
        })
    }catch(err) {
        console.log(err)
    }
}


export const clearCart = () => async dispatch => {
    try{
        dispatch({
            type:CLEAR_CART
        })
    }catch(err){

    }
}
