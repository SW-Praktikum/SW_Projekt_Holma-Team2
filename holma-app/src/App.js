import React from 'react';
import './App.css';
//import GroupAddDialog from './components/dialogs/GroupAddDialog';
import Startpage from './components/layout/Startpage';
import Header from './components/header';
import Navigation from './components/navigation';

function App() {
  return (
    <div className="App">

       <Header />

      <Navigation />

      <Startpage />

    </div>
  );
}
 
export default App;