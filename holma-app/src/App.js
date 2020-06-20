import React from 'react';
import './App.css';
import GroupAddDialog from './components/dialogs/GroupAddDialog';
import ListWithBoxes from "./components/GroupListEntry"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ListWithBoxes />
      </header>
    </div>
  );
}

export default App;
