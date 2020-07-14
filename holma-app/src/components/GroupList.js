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
import ShoppingListAddDialog from './dialogs/ShoppingListAddDialog';

import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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



class Grouplink extends Component{
  render(){
      return(
          <Button variant="contained" color="primary" style={{width:'100%'}}>
              Gruppe anzeigen
          </Button>
      )
  }
}


class ListCard extends Component {
  render() {
      return (
        <Card className="root" style={{/* minHeight: 250 ,  */minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: colors.teal[600]}}>
          <CardActionArea>
          <CardContent>
              <Typography className="title" style={{fontSize: 14, color: 'white'}}>{this.props.list.getName()}</Typography>
              <Typography className="title" style={{fontSize: 14, color: 'white'}}>Id: {this.props.list.getId()}</Typography>
          </CardContent>
          </CardActionArea>     
        </Card>
  )
}
}

class GroupList extends Component {
    constructor(props) {
        super(props);
        //console.log(this.props.match.params.groupId)
        this.state = {
            group: null,
            groupId: this.props.match.params.groupId,
            groupName: "",
            listElements:[],
            shoppingListName: "",
            shoppingListId:"",
        }}
      
    componentDidMount(){
      if(this.props.match.params.groupId){
          this.loadShoppingLists()
          this.loadGroupName();
        }
    }
    
    openDialog = () => {
      this.setState({
        openDialog: true})
    }

    handleClose = () => {
      this.setState({
        openDialog: false})
    }

    addStandardArticles = () => {
      if (this.state.checked === false)
        this.setState({checked: true})
      else
        this.setState({checked: false})
      
    }
    checkStandard = () => {
      if (this.state.checked === false) {
        // Liste ohne Standardartikel erstellen
        console.log("Ohne standard")
        this.createNewList()
      }
      else {
        console.log("Mit standard")
        this.createNewList()
        // add standardarticles to new list
        // Liste mit Standardartikel erstellen
      }
    }

    createNewList = () => {
      var lst = new ShoppingListBO(this.state.shoppingListName, this.state.groupId);
      AppAPI.getAPI().createShoppingList(lst).then(() => {
        this.loadShoppingLists()
      })
    }

    handleInputChange = (e) => {
      this.setState({shoppingListName: e.target.value})
    }

    loadGroupName = () => {
      AppAPI.getAPI().getGroupById(this.state.groupId).then((group) =>{
        this.setState({
          group: group,
          groupName: group.name,
        });
      }
       )
      }

    loadShoppingLists = () => {
      AppAPI.getAPI().getShoppingListsByGroupId(this.props.match.params.groupId).then((lists) => {
        console.log(lists)
        var listElements = lists.map((list) =>
        <Grid key={list.getId()} item xs={6} item lg={4}>
        <Paper className="paper" style ={{ textAlign:'center',}} >
          <ListCard key={list.getId()} list={list}/>
        </Paper>
      </Grid>
      )
        this.setState({
          listElements: listElements,
          loadingInProgress: true, // loading indicator 
          loadingError: null,
          shoppingListId: lists.id,
      });
         console.log("Save in state", listElements)
         console.log(this.state.shoppingListId)
      }).catch(e =>
          this.setState({ // Reset state with error from catch 
            loadingInProgress: false,
            loadingError: e
          })
        );  
      } 

    render() {
      const {listElements} = this.state;
          return(
            <div>
              <Box m={5} />
              <Card className="root" style={{/* minHeight: 250 ,  */minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: colors.teal[600]}}>
                <CardActionArea>
                  <CardContent>
                    <Typography className="title" style={{fontSize: 14, color: 'white'}}>Aktuelle Gruppe: {this.state.groupName} / {this.state.groupId}</Typography>
                  </CardContent>
                </CardActionArea>     
              </Card>
              <Link to={"/groupedit/" + this.props.match.params.groupId} style={{textDecoration: 'none'}}>
                <Grouplink/>
              </Link>
                <Box m={2} />
                <Typography className="title" style={{fontSize: 14, color: 'black'}}>Shoppinglists:</Typography>
                <Link to={"/shoppinglist/" + this.props.match.params.groupId} style={{textDecoration: 'none'}}>
                  <ListWithBoxes groupElements={listElements}/>
                </Link>
                <AddListDialog 
                  openDialog={this.openDialog}
                  open={this.state.openDialog}
                  handleClose={this.handleClose}
                  checked={this.state.checked}
                  addStandardArticles={this.addStandardArticles}
                  checkStandard={this.checkStandard}
                  handleInputChange={this.handleInputChange}
                />
            </div>        
    );
}}

export default GroupList;