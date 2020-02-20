import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "winter-quiz.firebaseapp.com",
  databaseURL: "https://winter-quiz.firebaseio.com",
  projectId: "winter-quiz",
  storageBucket: "winter-quiz.appspot.com",
  messagingSenderId: process.env.REACT_APP_MS_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_M_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
