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
          <Button align="center" variant="contained" fullWidth  color="primary" >
              Gruppendetails
          </Button>
      )
  }
}

class ListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        entriesTotal: null,
        entriesChecked: null,
    }}

  componentDidMount(){
    if(this.props.list){
        this.getEntries();
        this.getCheckedEntries();
      }
  }

  getEntries = () => {
    AppAPI.getAPI().getListEntriesByShoppingListId(this.props.list.getId()).then((result) => {
      this.setState({
        entriesTotal: result.length
      }) 
    })  
  }

  getCheckedEntries = () => {
    AppAPI.getAPI().getCheckedListEntriesByShoppingListId(this.props.list.getId()).then((result) => {
      this.setState({
        entriesChecked: result.length
      }) 
    })
  }

  render() {
      return (
        <Card className="root" style={{/* minHeight: 250 ,  */minWidth: '100%', marginBottom:10, marginTop:10, }}>
          <CardActionArea >
          <CardContent style={{backgroundColor: colors.teal[600]}}>
              <Typography align="left" className="title" style={{fontSize: 14, color: 'white'}}>{this.props.list.getName()}</Typography>
          </CardContent>
          <CardContent style={{backgroundColor: "#ffffff"}}>
              <Typography align="left" className="title" style={{fontSize: 14}}>Id: {this.props.list.getId()}</Typography>
              <Typography align="left" className="title" style={{fontSize: 14}}>
                {this.state.entriesChecked} von {this.state.entriesTotal} Einträgen erledigt</Typography>
          </CardContent>
          </CardActionArea>     
        </Card>
    )
  }
}

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            groupId: this.props.match.params.groupId,
            groupName: "",
            listElements:[],
            shoppingListName: "",
            shoppingListId:"",
            newListId: "",
            checked: false
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
        openDialog: false
      })
    }

    addStandardArticles = () => {
      if (this.state.checked === false)
        this.setState({checked: true})
      else
        this.setState({checked: false})
    }

    checkStandard = () => {
      this.createNewList()
      this.handleClose()
    }

    createNewList = () => {
      var lst = new ShoppingListBO(this.state.shoppingListName, this.state.groupId, "");
      AppAPI.getAPI().createShoppingList(lst).then(() => {
        if (this.state.checked === true) {
          AppAPI.getAPI().getShoppingListsByGroupId(this.state.groupId).then((result) => {
            const liste  = result[result.length - 1]
            AppAPI.getAPI().addStandardArticlesToShoppingList(this.state.groupId, liste.id).then (() => {
              this.loadShoppingLists()
            })
            this.setState({
              checked: false
            })
        });         
        }
        else {
          this.loadShoppingLists()
        }
      })
    }

    handleInputChange = (e) => {
      this.setState({shoppingListName: e.target.value})
    }

    loadGroupName = () => {
      AppAPI.getAPI().getGroupById(this.state.groupId).then((group) => {
        this.setState({
          group: group,
          groupName: group.name,
        });
      }
       )
      }

    loadShoppingLists = () => {
      console.log(this.props)
      AppAPI.getAPI().getShoppingListsByGroupId(this.props.match.params.groupId).then((lists) => {
        var listElements = lists.map((list) =>
        <Grid key={list.getId()} item xs={6} item lg={4}>
          <Link to={"/group/" + this.props.match.params.groupId + "/shoppinglist/" + list.getId()} style={{textDecoration: 'none'}}>
              <Paper className="paper" style ={{ textAlign:'center',}} >
                <ListCard key={list.getId()} list={list}/>
              </Paper>
            </Link>
        </Grid>
        )
        this.setState({
          listElements: listElements,
          loadingInProgress: true, // loading indicator 
          loadingError: null,
          shoppingListId: lists.id,
      });
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
            <React.Fragment>
              <Box m={1} />
              <Card className="root" style={{minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: "ffffff"}}>                
                <CardActionArea>
                  <CardContent>
                  <Grid container direction="row" justify="space-between" alignItems="center" spaching={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Gruppe: </b>{this.state.groupName}</Typography>
                      <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Id: </b>{this.state.groupId}</Typography>
                    </Grid>
                    <Grid style={{paddingBottom: 10}} item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={4}>
                      <Link to={"/groupedit/" + this.props.match.params.groupId + "/" + this.props.match.params.userId} style={{textDecoration: 'none'}}>
                        <Grouplink/>
                      </Link>
                    </Grid>
                  </Grid>
                  </CardContent>
                </CardActionArea>     
              </Card>
              
                <Box m={2} />
                <Card className="root" style={{minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: "ffffff"}}>                
                  <CardActionArea>
                    <CardContent>
                      <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Shoppinglisten:</b></Typography>
                    </CardContent>
                  </CardActionArea>     
                </Card>
                <ListWithBoxes groupElements={listElements}/>
                <ShoppingListAddDialog 
                  openDialog={this.openDialog}
                  open={this.state.openDialog}
                  handleClose={this.handleClose}
                  checked={this.state.checked}
                  addStandardArticles={this.addStandardArticles}
                  checkStandard={this.checkStandard}
                  handleInputChange={this.handleInputChange}
                />
            </React.Fragment>        
    );
}}

export default GroupList;