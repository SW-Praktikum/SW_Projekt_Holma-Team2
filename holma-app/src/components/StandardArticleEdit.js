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
import ArticleEditDialog from './dialogs/ArticleEditDialog';
import { colors } from '@material-ui/core';
import ListEntry from './ListEntry';



class StandardArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            standardArticle: this.props.standardArticle,
            groupId: this.props.groupId,
        }
    }

    setOpen(bool) {
        this.setState({
            open: bool
        })
    }

    openDialog = () => {
        this.setState({
            openDialog: true})
        }

    handleClose = () => {
        this.setState({
            openDialog: false})
        }
    

    deleteStandardArticle = (standard) => {
        AppAPI.getAPI().deleteStandardArticleFromGroup(this.state.groupId,standard).then(() => {
            this.props.loadStandardArticles()
        })
    }


    render() {
        const {standardArticle} = this.props;
        const { open } = this.state;
        console.log("Props:",this.props)
        return (
            <div >
                <TableContainer style={{marginTop: 20}}component={Paper}>
                    <Table aria-label="collapsible table">
                            <TableRow>
                                <TableCell width="10%"/>
                                <TableCell width="30%" align="left">{standardArticle.getId()}</TableCell>
                                <TableCell width="30%" align="left">{standardArticle.getName()}</TableCell>
                                <TableCell width="10%" align='right'>
                                    <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                                        <EditIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell width="10%" align='right'>
                                    <IconButton aria-label="expand row" size="small" onClick={() => this.deleteStandardArticle(standardArticle)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </Table>
                    </TableContainer>
                    <ArticleEditDialog 
                    openDialog={this.openDialog}
                    open={this.state.openDialog}
                    handleClose={this.handleClose}
                    article={standardArticle}
                />
                </div>
        );
    }
}

class StandardArticleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            StandardElements: [],
            openDialog: false,
            groupId: this.props.match.params.groupId,
            shoppingListId: this.props.match.params.shoppingListId,
            listEntryTableElements: [],
            retailers: [],
            users: [],
            articles: [],
            articlesCount: 0,
            openDialog: false,
            liseEntry: ""
        }
    }

    componentDidMount(){
        if(this.state.groupId) {
            this.loadRetailers();
            this.loadStandardArticles();
            console.log("Standardarticlessssss:",this.state.StandardElements);
            this.loadUsers();
            this.loadListEntries()
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
  

    loadStandardArticles = () => {
        AppAPI.getAPI().getStandardArticlesByGroupId(this.state.groupId).then((articles) => {
        var StandardElements = articles.map((standard) => 
        <StandardArticle groupId={this.state.groupId} standardArticle={standard} loadStandardArticles={this.loadStandardArticles} />)
            this.setState({
                StandardElements: StandardElements,
                loadingInProgress: true,
                loadingError: null,
                });
                return new Promise(function (resolve) { resolve(1) })
                }).catch(e =>
                    this.setState({ // Reset state with error from catch 
                    loadingInProgress: false,
                    loadingError: e
                })
        );  
    }

    loadUsers = () => {
        AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then((users) => {
            console.log("Loaded users for group '" + this.state.groupId + "':", users)
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
    
    render() {
        return (
            <div display='flex'>
            <TableContainer style={{marginTop: 20}}component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead style={{backgroundColor: colors.teal[600]}}>
                        <TableRow>
                            <TableCell width="20%" align="left "><b style={{ color: '#ffffff'}}>Name</b></TableCell>
                            <TableCell width="15%" align="center"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                            <TableCell width="15%" align="center"><b style={{ color: '#ffffff'}}>Einheit</b></TableCell>
                            <TableCell width="20%" align="center"><b style={{ color: '#ffffff'}}>Retailer</b></TableCell>
                            <TableCell width="15%" align="center"><b style={{ color: '#ffffff'}}>Artikel-ID</b></TableCell>
                            <TableCell width="15%" align="center"><b style={{ color: '#ffffff'}}>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer  component={Paper}>
                <Table>
                    <TableBody>
                        {this.state.StandardElements}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        )
    }
}


export default StandardArticleEdit;