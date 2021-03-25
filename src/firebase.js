import firebase from "firebase/app";
import "firebase/auth";


const  firebaseConfig = {
  apiKey: "AIzaSyDcvSIQ-DLDFrlbn6GWfi2g3JrwoLI8Ats",
  authDomain: "ecommerce-d26e9.firebaseapp.com",
  projectId: "ecommerce-d26e9",
  storageBucket: "ecommerce-d26e9.appspot.com",
  messagingSenderId: "998051019905",
  appId: "1:998051019905:web:9af4135d4a1ad8ac952180"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// Initialize Firebase

 

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()