import firebase from 'firebase'

import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyDMMppYBvwaeI0US-aMle9r979XqjXzToc",
    authDomain: "react-slack-e5339.firebaseapp.com",
    databaseURL: "https://react-slack-e5339.firebaseio.com",
    projectId: "react-slack-e5339",
    storageBucket: "react-slack-e5339.appspot.com",
    messagingSenderId: "891002544306",
    appId: "1:891002544306:web:ea5b6ba6ac845df2b829ab",
    measurementId: "G-GFTYJ8XR1D"
  };

  firebase.initializeApp(firebaseConfig)
  firebase.analytics();

  export default firebase

