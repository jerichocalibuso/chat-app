import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBedkV-zbpNZg668IwQQQnquEu3dQTENq8",
  authDomain: "chat-app-5e539.firebaseapp.com",
  databaseURL: "https://chat-app-5e539.firebaseio.com",
  projectId: "chat-app-5e539",
  storageBucket: "chat-app-5e539.appspot.com",
  messagingSenderId: "879972608060",
  appId: "1:879972608060:web:73dbc55f6d63936f797b39",
  measurementId: "G-HXV42JTH31"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.database();

export default db;
