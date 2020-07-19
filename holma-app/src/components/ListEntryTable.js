import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ListEntryEditDialog from './dialogs/ListEntryEditDialog';
import ListEntryAddDialog from './dialogs/ListEntryAddDialog';
import ListEntry from './ListEntry';
import Grid from '@material-ui/core/Grid';
import ListWithBoxes from './ListWithBoxes';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { colors, Button } from '@material-ui/core';

// classes for styling need to be created

class ShoppingListLink extends Component{
    render(){
        return(
            <Button align="center" variant="contained" fullWidth  color="primary" >
                Shoppinglistdetails
            </Button>
        )
    }
  }

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: this.props.match.params.groupId,
            shoppingListId: this.props.match.params.shoppingListId,
            listEntryTableElements: [],
            retailers: [],
            users: [],
            articles: [],
            articlesCount: 0,
            openDialog: false,
            liseEntry: "",
            shoppingListName: "",
        }

        console.log(this.state)
    }

    componentDidMount(){
        if(this.state.shoppingListId) {
            this.loadRetailers().then(() => {this.loadArticles()
                .then(() => { this.loadUsers()
                    .then(() => {
                        this.loadListEntries()
                        this.loadShoppingListName()})
                })
            });
           
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

    // Muss noch verschoben werden in GroupList.js!!
    loadRetailers = () => {
        return AppAPI.getAPI().getRetailers().then((retailers) => {
            console.log("Loaded all retailers:", retailers)
            this.setState({
                retailers: retailers,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            });
            return new Promise(function (resolve) {resolve(retailers)})
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
        );  
    } 
    
    loadShoppingListName = () => {
        AppAPI.getAPI().getShoppingListById(this.props.match.params.shoppingListId).then((shoppingList) => {
            this.setState({
                shoppingListName: shoppingList[0].name,
            })
        })
    }

    loadUsers = () => {
        return AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then((users) => {
            console.log("Loaded users for group '" + this.state.groupId + "':", users)
            this.setState({
                users: users,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            });
            return new Promise(function (resolve) {resolve(users)})
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
        );  
    } 

    loadArticles = () => {
        return AppAPI.getAPI().getArticlesByGroupId(this.state.groupId).then((articles) => {
            console.log("Loaded articles for group '" + this.state.groupId + "':", articles)
            this.setState({
                articles: articles,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            });
            return new Promise(function (resolve) {resolve(articles)})
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
        );  
    } 
            
    loadListEntries = () => {
        console.log(this.state.shoppingListId)
        AppAPI.getAPI().getListEntriesByShoppingListId(this.state.shoppingListId).then(listEntries => {
            console.log("Loaded list entries for shopping list '" + this.state.shoppingListId + "':", listEntries)
            var listEntryTableElements = listEntries.map((listEntry) => 
                <ListEntry 
                    listEntry={listEntry} 
                    loadListEntries={this.loadListEntries} 
                    retailers={this.state.retailers}
                    users={this.state.users}
                    articles={this.state.articles}
                    loadArticles={this.loadArticles}
                    groupId={this.state.groupId}
                />
            )

            this.setState({
                listEntryTableElements: listEntryTableElements,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            })
            return new Promise(function (resolve) { resolve(1) })
            }).catch(e =>
                this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
        );  
    }
    
    render() {
        return (
            <React.Fragment>
                <Box m={1} />
                <Card className="root" style={{minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: "ffffff"}}>                
                    <CardContent>
                    <Grid container direction="row" justify="space-between" alignItems="center" spaching={2}>
                        <Grid item xs={12} sm={4}>
                        <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Shoppingliste: </b>{this.state.shoppingListName}</Typography>
                        <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Id: </b>{this.props.match.params.shoppingListId}</Typography>
                        </Grid>
                        <Grid style={{paddingBottom: 10}} item xs={12} sm={4}></Grid>
                        <Grid item xs={12} sm={4}>
                       
                       
                       <Link 
                       //geben wir den namen der Liste irgendwie weiter
                       //hier richtig auf die neue Komponente verlinklen
                       //hab in der app.js schonmal was versucht, kp ob das der richtige weg ist
                       to={"/shoppinglistedit/" + this.props.match.params.shoppingListId} style={{textDecoration: 'none'}}>
                            <ShoppingListLink/>
                        
                        </Link>
                        </Grid>
                    </Grid>
                    </CardContent>   
                </Card>
                <Box m={1} />
                <TableContainer  component={Paper} style={{marginTop: 15}}>
                    <Table>
                        <TableHead style={{backgroundColor: colors.teal[600]}}>
                            <TableRow>
                                <TableCell align="left"/>
                                <TableCell align="right"><b style={{ color: '#ffffff'}}></b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Artikel</b></TableCell>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.listEntryTableElements}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ListEntryAddDialog
                    loadListEntries={this.loadListEntries} 
                    retailers={this.state.retailers}
                    users={this.state.users}
                    articles={this.state.articles}
                    loadArticles={this.loadArticles}
                    groupId={this.state.groupId}
                    openDialog={this.openDialog}
                    open={this.state.openDialog}
                    handleClose={this.handleClose}
                    shoppingListId={this.state.shoppingListId}
                />
            </React.Fragment>
            
        )
    }
}


export default ListEntryTable;