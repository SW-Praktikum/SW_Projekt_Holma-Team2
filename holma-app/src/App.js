import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './components/Theme';
import firebase from "firebase/app";
import "firebase/auth";
import Header from './components/layout/Header';
import Navigation from './components/Navigation';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import About from './components/pages/About';
import GroupEntries from './components/GroupEntries';
import GroupEdit from './components/GroupEdit';
import AppAPI from './api/AppAPI';
import UserBO from './api/UserBO';
import GroupList from './components/GroupList';
import User from './components/User';
import GroupInformation from './components/GroupEdit';
import Groupmember from './components/GroupEditDialog';
import MemberAddDialog from './components/dialogs/MemberAddDialog';
import MemberDetails from './components/GroupEdit';
import ArticleEdit from './components/ArticleEdit';
import StandardArticleEdit from './components/StandardArticleEdit';
import ListEntryTable from './components/ListEntryTable';
import Startpage from './components/layout/Startpage';


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
    console.log("Checking if '" + name + "' is stored in database with google id '" + googleId + "'")
    var api = AppAPI.getAPI()
    api.getUserByGoogleId(googleId).then((user) => {
      if (!user.getGoogleId()) {
        console.log("Creating new user for '" + name + "'") 
        var proposal = new UserBO(name, email, googleId)
        api.createUser(proposal).then((newUser) => {
          this.setState({
            user: newUser
          })
        })
      }
      else {
        console.log("User '" + name + "' already in database!")
        this.setState({
          user: user
        })
      }
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
              {
                user ?
                  <>
                    <Redirect to='/home'/>
                    <Navigation />
                    <Route path='/home'>
                      <Startpage user={user}/>
                    </Route>
                    <Route path='/groups'>
                      <GroupEntries user={user}/>
                    </Route>
                    <Route path='/groups/:groupId' component={GroupEdit}/>
                    <Route path='/about'>
                      <About/>
                    </Route>
                    <Route path='/grouplist/:groupId' component={GroupList}>
                    </Route>
                    <Route path='/groupedit/:groupId' component={MemberDetails}>
                    </Route>
                    <Route path='/articleedit/:groupId' component={ArticleEdit}>
                    </Route>
                    <Route path='/standardarticleedit/:groupId' component={StandardArticleEdit}>
                    </Route>
                    <Route path='/user'>
                      <User user={user}/>
                    </Route>  
                    <Route path='/group/:groupId/shoppinglist/:shoppingListId' component={ListEntryTable}>
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
