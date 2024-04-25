// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    authDomain: "prism-post.firebaseapp.com",
    projectId: "prism-post",
    storageBucket: "prism-post.appspot.com",
    messagingSenderId: "359278790827",
    appId: "1:359278790827:web:cb4a61ffed69c0ed7b8fee"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);