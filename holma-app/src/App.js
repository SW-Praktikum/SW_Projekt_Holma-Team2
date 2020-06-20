import React from 'react';
import './App.css';
import ListWithBoxes from "./components/GroupListEntry"
import GroupAddDialog from './components/dialogs/GroupAddDialog';
import AddListDialog from './components/dialogs/AddListDialog';

function App() {
  //ListWithBoxes
  //<ListWithBoxes /> 

  return (
    <div className="App">
      <header className="App-header">
        <GroupAddDialog />
      </header>
    </div>
  );
}

export default App;
