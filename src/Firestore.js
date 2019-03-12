import * as firebase from "firebase";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyD3EcxywnWU0L4TfILh6eZLG3G5QUyrUJc",
  authDomain: "ekrako-todo.firebaseapp.com",
  databaseURL: "https://ekrako-todo.firebaseio.com",
  projectId: "ekrako-todo",
  storageBucket: "ekrako-todo.appspot.com",
  messagingSenderId: "401979079535"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
