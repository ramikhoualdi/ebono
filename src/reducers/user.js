import { SELECTED_STORE, SELECTED_CATEGORY, ITEM_ADDED, ITEM_REMOVED, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_CART } from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initalState = {
    selectedStore: null,
    selectedCategory: null,
    cart: []
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case SELECTED_STORE:
            return {
                ...state,
                ...payload,
                selectedStore: payload
            }
        case SELECTED_CATEGORY:
            return {
                ...state,
                ...payload,
                selectedCategory: payload
            }
        case ITEM_ADDED:
            return {
                ...state,
                ...payload,
                cart: [...state.cart, payload]
            }
        case INCREASE_QUANTITY:
            state.cart.map(product => {
                if (product._id == payload._id) {
                    product.quantity = product.quantity + 1;
                }
            })
            return {
                ...state,
                ...payload,
                cart: [...state.cart]
            }
        case ITEM_REMOVED:
            state.cart.find((x, i, arr) => {
                if (x._id == payload._id) {
                    return state.cart.splice(i, 1)
                }
            })
            // console.log(state.cart.length, 'REDUCER')
            return {
                ...state,
                ...payload,
                cart: [...state.cart]
            }
        case DECREASE_QUANTITY:
            state.cart.map(product => {
                if (product._id == payload._id) {
                    product.quantity = product.quantity + -1;
                }
            })
            return {
                ...state,
                ...payload,
                cart: [...state.cart]
            }
        case CLEAR_CART:
            return {
                ...state,
                cart:[],
            }
        default:
            return state
    }
}