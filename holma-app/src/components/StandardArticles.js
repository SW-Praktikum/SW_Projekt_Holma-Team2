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
import EditIcon from '@material-ui/icons/Edit';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArticleEditDialog from './dialogs/ArticleEditDialog';
import { colors } from '@material-ui/core';
import ListEntry from './ListEntry';
import StandardArticleEditDialog from './dialogs/StandardArticleEditDialog';
import ListEntryAddDialog from './dialogs/ListEntryAddDialog';



class StandardArticles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            standardArticle: this.props.standardArticle,
            groupId: this.props.groupId,
            retailers: this.props.retailers,
            StandardElements: [],
            retailers: [],
            users: [],
            articles: [],
            articlesCount: 0,
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

    closeDialog = () => {
        this.setState({
            openDialog: false})
        }
    

    deleteStandardArticle = (standard) => {
        AppAPI.getAPI().deleteStandardArticleFromGroup(this.state.groupId,standard).then(() => {
            this.props.loadStandardArticles()
        })
    }

render(){
    const {standardArticle, articles, groupId, users, retailers} = this.props;
    const { open} = this.state;

return (
    <div >
        <TableRow width="100%">
            <TableCell style={{paddingLeft: 5, paddingTop: 0, paddingBottom: 0, paddingRight: 10}} width="10%" align="right">{standardArticle.getArticleName()}</TableCell>
            <TableCell padding="none" width="15%" align="left">{standardArticle.getAmount()}</TableCell>
            <TableCell padding="none" width="15%" align="left">{standardArticle.getUnit()}</TableCell>
            <TableCell padding="none" width="56%" align="left">{standardArticle.getArticleId()}</TableCell>
            <TableCell padding="none" width="6%">
                <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell padding="none" width="6%" align='right'>
                <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                     <EditIcon/>
                </IconButton>
            </TableCell>
            <TableCell style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 15}} width="6%" align='right'>
                <IconButton aria-label="expand row" size="small" onClick={() => this.deleteEntry(standardArticle)}>
                    <ClearRoundedIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <Table size="small" aria-label="purchases">
                    <TableHead >
                        <TableRow>
                            <TableCell colSpan={3} padding="none" width="30%" align="left"><b>Einkäufer</b></TableCell>
                            <TableCell colSpan={2} padding="none" width="20%" align="left"><b>Händler</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        <TableCell colSpan={3} padding="none" width="30%" align="left">{standardArticle.getPurchasingUserName()}</TableCell>
                        <TableCell colSpan={2} padding="none" width="20%" align="left">{standardArticle.getRetailerName()}</TableCell>
                        <TableCell colSpan={1} padding="none" width="10%" align='left'>
                        </TableCell>
                        
                    </TableBody>
                </Table>
            </Collapse>
            </TableCell>
        </TableRow>
        <StandardArticleEditDialog
            standardArticle={standardArticle}
            groupId={groupId}
            users={users}
            articles={articles}
            retailers={retailers}
            loadArticles={this.props.loadArticles}
            open={this.state.openDialog}
            openDialog={this.openDialog}
            closeDialog={this.closeDialog}
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
            this.loadRetailers().then(() => {this.loadArticles()
                .then(() => { this.loadUsers()
                    .then(() => {this.loadStandardArticles()})
                })
            })
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

    loadStandardArticles = () => {
        AppAPI.getAPI().getStandardArticlesByGroupId(this.state.groupId).then((articles) => {
        var StandardElements = articles.map((standard) => 
        <StandardArticles 
        groupId={this.state.groupId} 
        standardArticle={standard} 
        retailers={this.state.retailers}
        articles = {this.state.articles}
        users = {this.state.users} 
        loadStandardArticles={this.loadStandardArticles} 
        loadArticles={this.loadArticles}
        />)
            this.setState({
                StandardElements: StandardElements,
                loadingInProgress: true,
                loadingError: null,
                });
                return new Promise(function (resolve) { resolve(1) });
            }).catch(e =>
                    this.setState({ // Reset state with error from catch 
                    loadingInProgress: false,
                    loadingError: e
                })
        );  
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