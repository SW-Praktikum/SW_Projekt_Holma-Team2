import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './components/Theme';
import firebase from "firebase/app";
import "firebase/auth";
import Header from './components/layout/Header';
import Navigation from './components/navigation2'
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import About from './components/pages/About';
import GroupAddDialog from './components/dialogs/GroupAddDialog';
import GroupEntries from './components/GroupEntries';
import AppAPI from './api/AppAPI'
import UserBO from './api/UserBO';
import GroupList from './components/GroupList'
import Startpage from './components/layout/Startpage'

class App extends React.Component {
  #firebaseConfig = {
    apiKey: "AIzaSyCA9MdinpWLl36e6xYcArhtal6F7zBJ-EE",
    authDomain: "swprojekt-team2.firebaseapp.com",
    databaseURL: "https://swprojekt-team2.firebaseio.com",
    projectId: "swprojekt-team2",
    storageBucket: "swprojekt-team2.appspot.com",
    messagingSenderId: "243051164107",
    appId: "1:243051164107:web:7233ae995fc88619bcc64e",
  };

  constructor(props) {
    super(props);

    this.state = {
      googleUserData: null,
      appError: null,
      authError: null,
      authLoading: false,
      user: null
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
          googleUserData: user,
          authError:null,
          authLoading: false
        })
        
        
        this.checkIfUserInDatabase(this.state.googleUserData.displayName, this.state.googleUserData.email, this.state.googleUserData.uid)

        ;
      }).catch(err =>{
        this.setState({
          authError: err,
          authLoading: false
        });
      });
    } else {
      document.cookie = 'token=;path=/';

      this.setState({
        googleUserData: null,
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

  checkIfUserInDatabase(name, email, googleId) {
    console.log("Checking if", name, "is stored in database with google id", googleId)
    //var proposal = UserBO(name, email, googleId)
    var api = AppAPI.getAPI()
    api.getUserByGoogleId(googleId).then((user) => {
      if (!user.getGoogleId()) {
        console.log("Creating new user for", name)
        var proposal = new UserBO(name, email, googleId)
        var user = api.createUser(proposal)
      }
      else {
        console.log("User", name, "already in database!")
      }
      this.setState({
        user: user
      })
      console.log("User in state:", user)
    })

}

  componentDidMount() {
    firebase.initializeApp(this.#firebaseConfig);
    firebase.auth().languageCode = 'en';
    firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
  }

  render(){
    const {user, googleUserData, appError, authError, authLoading} = this.state;
      return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router basename={process.env.PUBLIC_URL}>
          <Container maxWidth='md'>
            <Header user={user} />
            <Navigation />
            <GroupList/>
            {
              user ?
                <>
                  <Redirect from='/' to='group' /> 
                  <Route exact path='/group'>
                  <Navigation />
                    <GroupEntries user={user}/>
                    <GroupAddDialog user={user}/> 
            <div style={{fontStyle: "italic"}}><br/><b>User:</b> {user.getName()} | <b>ID:</b> {user.getId()} | <b>Google ID:</b> {user.getGoogleId()} | <b>Member since:</b> {user.getCreationDate()}</div>

                  </Route>
                  <Redirect from='/' to='user' />
                  <Route exact path='/user'>
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
            <ContextErrorMessage error={authError}
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