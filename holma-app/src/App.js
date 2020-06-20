import React from 'react';
import './App.css';
//import GroupAddDialog from './components/dialogs/GroupAddDialog';
import Startpage from './components/layout/Startpage';
import Header from './components/header';
//import Navigation from ':/components/navigation;'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Startpage />
      </header>
    </div>
  );
}
 
export default App;