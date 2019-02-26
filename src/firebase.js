
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyAXOCK_ejo6-BjXqlawQc601JpashSnERc",
    authDomain: "spawn-slack-chat-app.firebaseapp.com",
    databaseURL: "https://spawn-slack-chat-app.firebaseio.com",
    projectId: "spawn-slack-chat-app",
    storageBucket: "spawn-slack-chat-app.appspot.com",
    messagingSenderId: "439091282014"
  };
  firebase.initializeApp(config);

  export default firebase;