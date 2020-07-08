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
import EntryEditDialog from './dialogs/EntryEditDialog';


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            checked: this.props.listEntry.getChecked(),
            listEntry: this.props.listEntry,
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
    
    handleChangeCheck = (e) => {
        this.setState({checked: e.target.checked}, () => {
            this.state.listEntry.setChecked(this.state.checked)
        })
        AppAPI.getAPI().updateListEntry(this.state.listEntry)
    }
    
    

    deleteEntry = (entry) => {
        AppAPI.getAPI().deleteListEntry(entry).then(() => {
            //hier die loadListEntries Funktion von weiter unten ausführen
        })
    }

    render() {
        const { listEntry } = this.props;
        const { open } = this.state
        return (
            <React.Fragment>
                <TableRow className="root">
                    <TableCell padding="checkbox">
                        <Checkbox
                            checked={this.state.checked}
                            onChange={this.handleChangeCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </TableCell>
                    
                    
                    <TableCell align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell align="right">{listEntry.getUnit()}</TableCell>
                    <TableCell component="th" scope="row">{listEntry.getName()}</TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell align='right'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                            <EditIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell align='right'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.deleteEntry(listEntry)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Einkäufer</TableCell>
                                    <TableCell align="right">Händler</TableCell>
                                    <TableCell align="right">Geändert</TableCell>
                                    <TableCell align="right">Standard</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableCell align="right">{listEntry.getPurchasingUserId()}</TableCell>
                                <TableCell align="right">{listEntry.getRetailerId()}</TableCell>
                                <TableCell align="right">{listEntry.getLastUpdated()}</TableCell>
                                <TableCell align='right'>
                                    <IconButton aria-label="expand row" size="small" >
                                        {listEntry.isStandardarticle() ?  <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>
                                </TableCell>
                                
                            </TableBody>
                        </Table>
                    </Collapse>
                    </TableCell>
                </TableRow>
                <EntryEditDialog 
                    openDialog={this.openDialog}
                    open={this.state.openDialog}
                    handleClose={this.handleClose}
                    listEntry={listEntry}
                />
            </React.Fragment>
        );
    }
}

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: [],
            
        }
    }

    componentDidMount(){
        if(this.props.shoppingListId){
            this.loadListEntries();
          }
    }
  
    loadListEntries = () => {
        AppAPI.getAPI().getListEntriesByShoppingListId(this.props.shoppingListId).then(listEntries => {
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
            <div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell align="right"><b>Anzahl</b></TableCell>
                            <TableCell align="right"><b>Einheit</b></TableCell>
                            <TableCell><b>Artikel</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.listEntryTableElements}
                    </TableBody>
                </Table>
            </TableContainer>
            
            </div>
        )
    }
}


export default ListEntryTable;