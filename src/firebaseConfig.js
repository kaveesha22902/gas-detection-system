// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database

const firebaseConfig = {
    apiKey: "AIzaSyAv3krUqUpMiULtCbzN4-E7fN3Sa0s5E8U",
    authDomain: "gasdetection-38b96.firebaseapp.com",
    databaseURL: "https://gasdetection-38b96-default-rtdb.firebaseio.com",
    projectId: "gasdetection-38b96",
    storageBucket: "gasdetection-38b96.appspot.com",
    messagingSenderId: "621603386782",
    appId: "1:621603386782:web:5546ffd9d2130ffec5528f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app); // For Realtime Database

export { db };
