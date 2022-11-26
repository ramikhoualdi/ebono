import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyDhTNylbCPcHcCoFavsEOlXeekmnig4TKI",
    authDomain: "ebono-5a07e.firebaseapp.com",
    projectId: "ebono-5a07e",
    storageBucket: "ebono-5a07e.appspot.com",
    messagingSenderId: "422355293793",
    appId: "1:422355293793:web:25c86b3f52c9fb25f3bc20"
}

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
} 