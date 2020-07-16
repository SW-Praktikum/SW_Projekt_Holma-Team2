import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import ShoppingListBO from '../api/ShoppingListBO';

import TextField from '@material-ui/core/TextField';


import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListWithBoxes from './ListWithBoxes';
import GroupEntry from './GroupEntries';
import { colors } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';


class OneGroupStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.match.params.groupId,
      group: "",
      listEntries: [],
      listElements:[],
      users: [],
  }}

  componentDidMount() {
    if (this.props.match.params.groupId) {
      this.loadGroup();
      this.loadUsers();
      this.loadShoppingLists();
    }
  }

  loadGroup(){
    AppAPI.getAPI().getGroupById(this.state.groupId).then(group =>{
      this.setState({
        group:group,
      })
    })
  }
  
  loadUsers(){
    AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then(users =>{
      this.setState({
        users:users,
      })
    })
  }


  loadShoppingLists(){
    AppAPI.getAPI().getShoppingListsByGroupId(this.state.groupId).then(list =>{
      this.setState({
        listElements:list,
      })
    })
  }

    
render(){
  return(
    <div>
      <Typography>{this.state.groupId}</Typography>
      <Typography>{this.state.group}</Typography>
      <Typography>{this.state.listElements}</Typography>
    </div>
  );
}
}
  

    
export default OneGroupStat;
