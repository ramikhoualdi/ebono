import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, SELECTED_USER, LOGOUT } from '../actions/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initalState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    register: false
}

export default function (state = initalState, action) {
    const { type, payload } = action
    switch (type) {
        case USER_LOADED:
            AsyncStorage.setItem('user', JSON.stringify(payload))
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true,
                user:payload,
                selectedUser:payload.type
            }
        case SELECTED_USER:
            return {
                ...state,
                ...payload,
                selectedUser: payload
            }
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('token', payload.token)
            // console.log(payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                selectedUser: payload.user.type,
                loading: false,
            }
        case LOGIN_FAIL:
        case LOGOUT:
            AsyncStorage.removeItem('token')
            AsyncStorage.removeItem('user')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                loading: false,
                register: false
            }
        default:
            return state
    }
}