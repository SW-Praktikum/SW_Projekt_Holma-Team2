import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAPI from '../api/AppAPI';
import ShoppingListBO from '../api/ShoppingListBO';
import ShoppingListAddDialog from './dialogs/ShoppingListAddDialog';
import ListWithBoxes from './ListWithBoxes';


/**
 * Es werden die bestehenden Shoppinglisten einer Gruppe angezeigt.
 * 
 * Es können durch das ShoppingListAddDialog weitere Shoppinglisten hinzugefügt werden
 * 
 * Es werden die Gruppen-Id und der Gruppenname angezeigt und es besteht die Möglichkeit, die Gruppendetails aufzurufen.
 * 
 */

class Grouplink extends Component{
  render(){
      return(
          <Button align="center" variant="contained" fullWidth  color="primary" >
              Details
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
            checked: false,
            minLength: 3,
            buttonDisabled: true
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

            AppAPI.getAPI().addStandardArticlesToShoppingList(this.state.groupId, liste.getId()).then (() => {
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
      let shoppingListName = e.target.value
      let buttonDisabled = true
      if (shoppingListName.length >= this.state.minLength) {
        buttonDisabled = false
      }
      this.setState({
        shoppingListName: shoppingListName,
        buttonDisabled: buttonDisabled
      })
      
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
      const {listElements, buttonDisabled, shoppingListName, minLength} = this.state;
          return(
            <React.Fragment>
              <Box m={1} />
              <Card className="root" style={{minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: "ffffff"}}>                
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
              </Card>
              
                <Box m={2} />
                <Card className="root" style={{minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: "ffffff"}}>                
                    <CardContent>
                      <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Shoppinglisten:</b></Typography>
                    </CardContent>
                </Card>
                <ListWithBoxes groupElements={listElements}/>
                <Box m={10} />
                <ShoppingListAddDialog 
                  openDialog={this.openDialog}
                  buttonDisabled={buttonDisabled}
                  minLength={minLength}
                  open={this.state.openDialog}
                  shoppingListName={shoppingListName}
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