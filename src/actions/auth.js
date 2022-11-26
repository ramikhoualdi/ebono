import api from "../utils/api";
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, SELECTED_USER, LOGOUT } from "./types";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message';



export const loadUser = () => async dispatch => {
    try {
        var userData = await AsyncStorage.getItem('token')
        // console.log(userData,'TOKEN')
        await api({
            method: 'GET',
            url: '/user',
            headers: {
                'x-auth-token': userData
            }
        }).then((res) => {
            // console.log(res,'USER LOADED')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => Toast.show({
                type: 'error',
                text1: 'Login',
                text2: `${error.msg}`
            }))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


export const login = (phone, type, email) => async dispatch => {
    try {

        await api({
            method: 'POST',
            url: '/auth/login',
            data: {
                phone:phone,
                verified:true,
                email:email,
            }
        }).then((res) => {
            console.log(res.data)
            
            Toast.show({
                type: 'success',
                text1: 'Login',
                text2: `OTP Verified`
            });
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
    } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => Toast.show({
                type: 'error',
                text1: 'Login',
                text2: `${error.msg}`
            }))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}


export const selectUser = (user) => async dispatch => {
    try {
        // console.log(user,'USER')
        user === null ? 'Donor' : user
        // console.log(user)
        dispatch({
            type: SELECTED_USER,
            payload: user
        })
    } catch (err) {
        console.log(err)
    }
}

export const logout = () => async dispatch => {
    try{
        dispatch({
            type: LOGOUT
        })
    }catch(err){
        console.log(err)
    }
}