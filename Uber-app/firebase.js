// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyD48TaqOl3Jk3zDCkrEkb14MqedGCdWDPU",
  authDomain: "uber-app2-76568.firebaseapp.com",
  projectId: "uber-app2-76568",
  storageBucket: "uber-app2-76568.appspot.com",
  messagingSenderId: "985896718598",
  appId: "1:985896718598:web:9540ac019a327a538a0e87",
  measurementId: "G-MYX3WKS7YT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };