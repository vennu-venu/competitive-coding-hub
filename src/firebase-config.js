import firebase from "firebase/compat/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA0DS63arZiz2F_U0pR3KJUnOKdgxmpvyg",
  authDomain: "competitive-coding-hub.firebaseapp.com",
  projectId: "competitive-coding-hub",
  storageBucket: "competitive-coding-hub.appspot.com",
  messagingSenderId: "262758622416",
  appId: "1:262758622416:web:5d6caf6d274ac4abc7aad5",
  measurementId: "G-QP42KK6PD2"
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;