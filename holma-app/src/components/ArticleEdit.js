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

class Article extends Component {
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
            <div >
                <TableContainer style={{marginTop: 20}}component={Paper}>
                    <Table aria-label="collapsible table">
                            <TableRow>
                                <TableCell width="10%"/>
                                <TableCell width="30%" align="left">{article.getId()}</TableCell>
                                <TableCell width="30%" align="left">{article.getName()}</TableCell>
                                <TableCell width="10%" align="left"></TableCell>
                                <TableCell width="10%" align='right'>
                                    <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                                        <EditIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell width="10%" align='right'>
                                    <IconButton aria-label="expand row" size="small" onClick={() => this.deleteArticle(article)}>
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
                    article={article}
                />
                </div>
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
            var ArticleElements = articles.map((article) => <Article article={article} loadArticles={this.loadArticles} />)
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
            <div display='flex'>
            <TableContainer style={{marginTop: 20}}component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead style={{backgroundColor: colors.teal[600]}}>
                        <TableRow>
                            <TableCell width="10%"/>
                            <TableCell width="30%" align="left"><b style={{ color: '#ffffff'}}>Id</b></TableCell>
                            <TableCell width="30%" align="left "><b style={{ color: '#ffffff'}}>Name</b></TableCell>
                            <TableCell width="10%" align="center"></TableCell>
                            <TableCell width="20%" align="center"><b style={{ color: '#ffffff'}}>Edit</b></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
            <TableContainer  component={Paper}>
                <Table>
                    <TableBody>
                    {this.state.ArticleElements}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        )
    }
}


export default ArticleEdit;
