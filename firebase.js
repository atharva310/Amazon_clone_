// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyPLPmraXhy685i0_wsiUyY7LFBlWEjAk",
    authDomain: "clone-c5799.firebaseapp.com",
    projectId: "clone-c5799",
    storageBucket: "clone-c5799.appspot.com",
    messagingSenderId: "466166535357",
    appId: "1:466166535357:web:65bbeb92a2ef653f7d13d4"
};

// Initialize Firebase
const apps = getApps()
const app = !apps.length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)

export default db;