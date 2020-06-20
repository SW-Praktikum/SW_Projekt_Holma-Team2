import React from 'react';
import './App.css';
import GroupAddDialog from './components/dialogs/GroupAddDialog';
import Startpage from './components/layout/Startpage';
import Navigation from './components/navigation'
import Header from './components/header'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <navigation className= "App-navigation" style= {{float: left}}>
        <Navigation />
      </navigation>
    </div>
  );
}
 
export default App;