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
import GroupBO from '../api/GroupBO';

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
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListWithBoxes from './ListWithBoxes';



/*
class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
  }};
*/
    

  /*render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checked}
          onChange={this.handleChange('checked')}
          value="checked"
        />
      </div>
    );
  }
}*/
/*
function EditButton(){
  return(
      <Fab size="small" color="secondary" aria-label="edit">
          <EditIcon />
      </ Fab>
  )
}
*/

/*function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>Shoppinglist</b></TableCell>
            <TableCell align="right"><b>Member</b></TableCell>
            <TableCell align="right"><b>Status</b></TableCell>
            <TableCell align="right"><b>Edit</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


function AddShoppinglist() {
  return (
    <TableContainer component={Paper} style={{ width: '100%',}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '20%',}}><b>Add Shoppinglist</b></TableCell>
          <TextField id="standard-basic" label="name" style={{ width: '40%',}} />
            <TableCell style={{ width: '30%',}}>Add all Standardarticles</TableCell>
            <Checkboxes style={{ width: '10%',}}/>
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  );}
 
*/

/* Hierbei wird man an die Component "GroupEdit" weitergeleitet*/
/*class Grouplink extends Component{
    render(){
        return(
            <Button variant="contained" color="primary" style={{width:'100%'}}>
                Gruppe bearbeiten
            </Button>
        )
    }
}*/



class GroupList extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props.match.params.groupId)
        this.state = {
            group: null,
            groupId: this.props.params.groupId,
            shoppingLists:[],
            shoppingListName: "",
            shoppingListMember: [],
            shoppingListNumberChecked: "",
            shoppingListNumberUncheked: "",
            shoppingListLastUpdated: "",
            memberId: "",
            ArticleName:"",
        }
      }
        
      
    componentDidMount(){
      if(this.props.match.params.groupId){
          
          console.log(this.props)
          this.loadShoppingLists();
        }
    }

    loadShoppingLists = () => {git 
      console.log(AppAPI.getAPI().getShoppingListsByGroupId(this.state.groupId))
      
      /** 
      .then(lists => {
        console.log("Loaded lists:", lists)
        console.log("Group Id:", this.state.groupId)
        var listElements = lists.map((list) => 
        <Grid  item xs={4}>
        <Paper style ={{ textAlign:'center',}} >
        <List item xs={4}>
          <ListItem>
        <ListItemText
          primary={list.getName()}
          secondary={"List-Id " + list.getId()}
        />
      </ListItem>
      </List>
      </Paper>
      </Grid>
      )
      this.setState({
        shoppingLists: listElements,
        loadingInProgress: true, // loading indicator 
        loadingError: null
      })
      }).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e
    })
    );*/
  }

    render() {
      const {shoppingLists} = this.state;
      this.loadShoppingLists = this.loadShoppingLists.bind(this)
            return(
            <div>
              <Box m={5} />
              <Link to={"/groupedit/" + this.props.match.params.groupId} style={{textDecoration: 'none'}}>
                <Grouplink/>
              </Link>
                <Box m={2} />
                <GroupList
                loadShoppingLists= {this.loadShoppingLists}
                groupId = {this.state.groupId}
                />
                <Box m={2} />
                
              <ListWithBoxes groupElements ={shoppingLists}/>
            </div>        
    );
}}

export default GroupList;