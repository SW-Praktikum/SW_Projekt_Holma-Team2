import { Typography } from '@material-ui/core';
import React from 'react';
import AppAPI from '../api/AppAPI';


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
    AppAPI.getAPI().getListEntriesByUserId(this.state.userId).then(entry =>{
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
