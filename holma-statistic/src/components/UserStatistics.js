import { Typography } from '@material-ui/core';
import React from 'react';
import AppAPI from '../api/AppAPI';

/**
 * Es wird die Statistik des eingeloggten Benutzers angezeigt.
 * 
 * Die enthaltenene Filterfunktion kann durch das Angeben eines Artikels, Einkäufers, Händlers oder einem Zeitraum die gesamten Listeneinträge filtern.
 * Durch die enthaltene Sortierfunktion können die Listeneinträge nach einem ausgewählten Attributs sortiert werden.
 * 
 * Die angegebenen 'Anzahl Einkäufe nach Einzelhändler' stellt die Häufigkeit der eingekauften Artikel bezogen auf den jeweiligen Einzelhändler dar.
 * Dabei werden die Einträge nach Häufigkeit absteigend dargestellt.
 */

class UserStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userId: this.props.user.id,
      userName: this.props.user.name,
      group: "",
      listElements: [],
  }}

  componentDidMount() {
    if (this.props.user) {
      this.loadGroups();
      this.loadListEntries();
      
    }
  }

  loadGroups(){
    AppAPI.getAPI().getGroupsByUserId(this.state.userId).then(groups =>{
      this.setState({
        group:groups,
      })
    })
  }

  loadListEntries(){
    AppAPI.getAPI().getListEntriesByUserId(this.state.userId, true).then(entry =>{
      this.setState({
        listElements:entry,
      })
    })
  }
    
render(){
  return(
    <div>
      <Typography>{console.log(this.state.listElements)}</Typography>
    </div>
  );
}
}
  

    
export default UserStatistics;
