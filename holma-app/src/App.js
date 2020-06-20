import React from 'react';
import './App.css';
import GroupAddDialog from './components/dialogs/GroupAddDialog';
import AddListDialog from './components/dialogs/AddListDialog';
import ListWithBoxes from './components/GroupListEntry';

function App() {
  //ListWithBoxes
  //<ListWithBoxes /> 

  return (
    <div className="App">
      <header className="App-header">
        <ListWithBoxes />
        <GroupAddDialog />
      </header>
    </div>
  );
}

export default App;
