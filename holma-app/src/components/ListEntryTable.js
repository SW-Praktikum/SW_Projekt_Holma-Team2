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
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    setOpen(bool) {
        this.setState({
            open: bool
        })
    }

    render() {
        const { listEntry } = this.props;
        const { open } = this.state
        return (
            <React.Fragment>
                <TableRow className="root">
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{listEntry.getName()}</TableCell>
                    <TableCell align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell align="right">{listEntry.getUnit()}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Einkäufer</TableCell>
                                    <TableCell align="right">Retailer</TableCell>
                                    <TableCell align="right">Std.</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableCell align="right">{listEntry.getPurchasingUserId()}</TableCell>
                                <TableCell align="right">{listEntry.getRetailerId()}</TableCell>
                                <TableCell align="right">{listEntry.isStandardarticle()}</TableCell>
                            </TableBody>
                        </Table>
                    </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: []
        }
    }

    componentDidMount(){
        if(this.props.shoppingListId){
            this.loadListEntries();
          }
      }
      
  
      loadListEntries = () => {
        AppAPI.getAPI().getListEntryByShoppingListId(this.props.shoppingListId).then(listEntries => {
            console.log("Loaded list entries for shopping list '" + this.props.shoppingListId + "':", listEntries)
            var listEntryTableElements = listEntries.map((listEntry) => <ListEntry listEntry={listEntry} />)

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
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell><b>Artikel</b></TableCell>
                            <TableCell align="right"><b>Anzahl</b></TableCell>
                            <TableCell align="right"><b>Einheit</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.listEntryTableElements}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}


export default ListEntryTable;