import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import firebase from "firebase/app";
import "firebase/auth";
import React from 'react';
import { HashRouter as Router, Redirect, Route } from 'react-router-dom';
import AppAPI from './api/AppAPI';
import UserBO from './api/UserBO';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import LoadingProgress from './components/dialogs/LoadingProgress';
import GroupEntries from './components/GroupEntries';
import Header from './components/layout/Header';
import ListEntryTable from './components/ListEntryTable';
import Navigation from './components/Navigation';
import OneGroupStat from './components/OneGroupStat';
import About from './components/pages/About';
import SignIn from './components/pages/SignIn';
import theme from './components/Theme';
import UserProfile from './components/User';


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
        document.cookie = `token=${token}; path=/; domain=.holma.xyz;`;
        //console.log(document.cookie)
        this.setState({
          googleUserData: user,
          authError:null,
          authLoading: false
        })
        
        this.checkIfUserInDatabase(user.displayName, user.email, user.uid);
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
    //console.log("Checking if '" + name + "' is stored in database with google id '" + googleId + "'")
    var api = AppAPI.getAPI()
    api.getUserByGoogleId(googleId).then((user) => {
      if (!user.getGoogleId()) {
        //console.log("Creating new user for '" + name + "'") 
        var proposal = new UserBO(name, email, googleId)
        api.createUser(proposal).then((newUser) => {
          this.setState({
            user: newUser
          })
        })
      }
      else {
        //console.log("User '" + name + "' already in database!")
        this.setState({
          user: user
        })
      }
      //console.log("User in state:", user)
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
              {
                user ?
                  <>
                    <Redirect to='/user-statistics'/>
                    <Navigation />
                    <Route path='/user-statistics'>
                      <ListEntryTable user={user}/>
                    </Route>
                    <Route path='/groups'>
                      <GroupEntries user={user}/>
                    </Route>
                    <Route path='/OneGroupStat/:groupId' component={OneGroupStat}>
                    </Route>
                    <Route path='/about'>
                      <About/>
                    </Route>
                    <Route path='/user'>
                      <UserProfile user={user}/>
                    </Route>
                  </>
                  :
                  <>
                    <Redirect to='/SignIn' />
                    <SignIn onSignIn={this.handleSignIn}/>
                  </>
              }

              <LoadingProgress show={authLoading} />
              <ContextErrorMessage error={authError}
              contextErrorMsg={'Es lief wohl etwas schief während deiner Anmeldung.'} onReload={this.handleSignIn} />
              <ContextErrorMessage error={appError}
              contextErrorMsg={'Es lief wohl etwas innerhalb des Programms schief. Bitte lade die Seite nochmals, danke!'} />
            </Container>
          </Router>
        </ThemeProvider>
    );
  }
}
export default App;
