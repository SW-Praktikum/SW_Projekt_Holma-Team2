import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import Theme from '.Theme';
import SignIn from '.components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';

class App extends React.Component {
  #firebaseConfig = {
    apiKey: "AIzaSyCA9MdinpWLl36e6xYcArhtal6F7zBJ-EE",
    authDomain: "swprojekt-team2.firebaseapp.com",
    databaseURL: "https://swprojekt-team2.firebaseio.com",
    projectId: "swprojekt-team2",
    storageBucket: "swprojekt-team2.appspot.com",
    messagingSenderId: "243051164107",
    appId: "1:243051164107:web:7233ae995fc88619bcc64e",
    //measurementId: "G-Z0GE8FXSJ0"
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
        <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Router basename={ProcessingInstruction.env.PUBLIC_URL}>
          <Container maxWidth='md'>
            <Header user={currentUser} />
            {
              currentUser ?
                <>
                  <Redirect from='/' to='user' /> {/*hier habe ich user statt customer verwendet*/}
                  <Route exact path='/user'>
                  </Route>
                  <Route path='/group'>
                  </Route>
                  <Route path='/about' component={About} />
                </>
                :
                <>
                  <Redirect to='/index.html' />
                  <SignIn onSignIn={this.handleSignIn}
                  />
                </>            
            }
            <LoadingProgress show={authLoading} />
            <ContentErrorMessage error={authError}
            contextErrorMsg={'Es lief wohl etwas schief während deiner Anmeldung.'} onReload={this.handleSignIn}
            />
            <ContextErrorMessage error={appError}
            contextErrorMsg={'Es lief wohl etwas innerhalb des Programms schief. Bitte lade die Seite nochmals, danke!'} />
          </Container>
        </Router>
        </ThemeProvider>
  );
  }
}
export default App;
