import { colors } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import ArticleEditDialog from './dialogs/ArticleEditDialog';

/**
 * Es werden die gesamten Artikel einer Gruppe in einer Übersicht dargestellt.
 * Die Artikel können hierbei geändert und gelöscht werden.
 */

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            article: this.props.article,
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
    

    deleteArticle = (article) => {
        AppAPI.getAPI().deleteArticle(article).then(() => {
            this.props.loadArticles()
        })
    }


    render() {
        const { article } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <ArticleEditDialog
                    openDialog={this.openDialog}
                    open={this.state.openDialog}
                    handleClose={this.handleClose}
                    article={article}
                />
                <TableRow>
                    <TableCell padding="dense" align="left">{article.getId()}</TableCell>
                    <TableCell padding="dense" align="left">{article.getName()}</TableCell>
                    <TableCell padding="dense" align='right'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                            <EditIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell padding="dense" align='right'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.deleteArticle(article)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}


class ArticleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ArticleElements: [],
            openDialog: false,
            groupId: this.props.match.params.groupId,
            
        }
    }

    componentDidMount(){
        if(this.props.match.params.groupId){
            this.loadArticles();
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
  
    loadArticles = () => { //Hier muss eine neue Methode - getArticlesByGroupId hinzugefügt werden
        AppAPI.getAPI().getArticlesByGroupId(this.props.match.params.groupId).then(articles => {
            console.log("Loaded articles for group '" + this.props.match.params.groupId + "':", articles)
            var ArticleElements = articles.map((article) => <Articles article={article} loadArticles={this.loadArticles} />)
            //hier noch ListEntrys ergänzen
            this.setState({
                ArticleElements: ArticleElements,
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
            <React.Fragment>
                <TableContainer style={{marginTop: 15}} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead style={{backgroundColor: colors.teal[600]}}>
                            <TableRow>
                                <TableCell align="left"><b style={{color: '#ffffff'}}>Id</b></TableCell>
                                <TableCell align="left "><b style={{color: '#ffffff'}}>Name</b></TableCell>
                                <TableCell/>
                                <TableCell align="left"><b style={{color: '#ffffff'}}>Edit</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.ArticleElements}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }
}


export default ArticleEdit;
