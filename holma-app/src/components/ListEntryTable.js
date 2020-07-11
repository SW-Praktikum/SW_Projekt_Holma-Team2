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
import { colors } from '@material-ui/core';

// classes for styling need to be created


class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: [],
            retailers: [],
            users: [],
            articles: [],
            openDialog: false,
        }
    }

    componentDidMount(){
        if(this.props.shoppingListId){
            this.loadUsers();
            this.loadRetailers();
            this.loadArticles();
            this.loadListEntries();
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
    AppAPI.getAPI().getRetailers().then((retailers) => {
        console.log("Loaded all retailers:", retailers)
        this.setState({
        retailers: retailers,
        loadingInProgress: true, // loading indicator 
        loadingError: null,
    });
    }).catch(e =>
        this.setState({ // Reset state with error from catch 
            loadingInProgress: false,
            loadingError: e
        })
        );  
    } 
  
    loadUsers = () => {
        AppAPI.getAPI().getUsersByGroupId(this.props.groupId).then((users) => {
          console.log("Loaded users for group '" + this.props.groupId + "':", users)
          this.setState({
            users: users,
            loadingInProgress: true, // loading indicator 
            loadingError: null,
        });
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
          );  
        } 

    loadArticles = () => {
        AppAPI.getAPI().getArticlesByGroupId(this.props.groupId).then((articles) => {
            console.log("Loaded articles for group '" + this.props.groupId + "':", articles)
            this.setState({
            articles: articles,
            loadingInProgress: true, // loading indicator 
            loadingError: null,
        });
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
            );  
        } 
            
    loadListEntries = () => {
        AppAPI.getAPI().getListEntriesByShoppingListId(this.props.shoppingListId).then(listEntries => {
            console.log("Loaded list entries for shopping list '" + this.props.shoppingListId + "':", listEntries)
            var listEntryTableElements = listEntries.map((listEntry) => 
            <ListEntry 
                listEntry={listEntry} 
                loadListEntries={this.loadListEntries} 
                retailers={this.state.retailers}
                users={this.state.users}
                articles={this.state.articles}
                loadArticles={this.loadArticles}
                groupId={this.props.groupId}
            />)

            this.setState({
                listEntryTableElements: listEntryTableElements,
                loadingInProgress: true, // loading indicator 
                loadingError: null
                })
            }).catch(e =>
                this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
        );  
    }
    
    render() {
        return (
            <div display='flex'>
            <TableContainer style={{marginTop: 20}}component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead style={{backgroundColor: colors.teal[600]}}>
                        <TableRow>
                            <TableCell width="10%"/>
                            <TableCell width="16%" align="left"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                            <TableCell width="56%" align="left"><b style={{ color: '#ffffff'}}>Artikel</b></TableCell>
                            <TableCell width="6%"/>
                            <TableCell width="6%"/>
                        </TableRow>
                    </TableHead>
                    
                </Table>
            </TableContainer>
            <TableContainer  component={Paper}>
                <Table>
                    <TableBody>
                    {this.state.listEntryTableElements}
                    </TableBody>
                </Table>
            </TableContainer>
            <ListEntryAddDialog 
                retailers={this.state.retailers}
                openDialog={this.openDialog}
                open={this.state.openDialog}
                handleClose={this.handleClose}
            />
            
            </div>
        )
    }
}


export default ListEntryTable;