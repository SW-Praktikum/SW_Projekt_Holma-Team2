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
import EntryAddDialog from './dialogs/EntryAddDialog';
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


class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
                        
        }
    }


    
    render() {
        return (
            <div display='flex'>
            <Typography>
                Hallo User
            </Typography>
            </div>
        )
    }
}


export default StartPage;
