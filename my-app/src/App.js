import React from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";

class App extends React.Component {
  #firebaseConfig = {
    apiKey: "AIzaSyCA9MdinpWLl36e6xYcArhtal6F7zBJ-EE",
    authDomain: "swprojekt-team2.firebaseapp.com",
    databaseURL: "https://swprojekt-team2.firebaseio.com",
    projectId: "swprojekt-team2",
    storageBucket: "swprojekt-team2.appspot.com",
    messagingSenderId: "243051164107",
    appId: "1:243051164107:web:7233ae995fc88619bcc64e",
    measurementId: "G-Z0GE8FXSJ0"
  };

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      appError: null,
      authError: null,
      authLoading: false
    };
  }

  static getDerivedStateFromError(error) {
    return {appError: error};
  }

  handleAuthStateChange = user => {
    if (user) {
      this.setState({
        authLoading: true
      });

      user.getIdToken().then(token => {
        document.cookie = `token=${token};path=/`;

        this.setState({
          currentUser: user,
          authError:null,
          authLoading: false
        });
      }).catch(err =>{
        this.setState({
          authError: err,
          authLoading: false
        });
      });
    }else {
      document.cookie = 'token=;path=/';

      this.setState({
        currentUser: null,
        authLoading: false
      });
    }
  }

  handleSignIn = () => {
    this.setState({
      authLoading: true
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  }

  componentDidMount() {
    firebase.initializeApp(this.#firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  render(){
    const {
      currentUser, appError, authError, authLoading} =this.state;
    return (
      <div className="App">
        <header className="App-header">
          This is a App
        </header>
      </div>
    );
  }
}
export default App;
