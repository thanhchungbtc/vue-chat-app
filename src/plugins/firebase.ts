import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBWsFGnV2W1Nvqb1EST1cLUuVPS_b8vRTE",
  authDomain: "flutter-chap-app.firebaseapp.com",
  databaseURL: "https://flutter-chap-app.firebaseio.com",
  projectId: "flutter-chap-app",
  storageBucket: "flutter-chap-app.appspot.com",
  messagingSenderId: "550053938204",
  appId: "1:550053938204:web:0e571871f5424448a90bd9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);