import React from 'react';
import {Paper, Typography, Tabs, Tab, AppBar }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Assessment from '@material-ui/icons/Assessment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
import Grid from '@material-ui/core/Grid';
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
