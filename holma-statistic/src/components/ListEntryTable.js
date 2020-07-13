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
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EntryEditDialog from './dialogs/EntryEditDialog';
import EntryAddDialog from './dialogs/EntryAddDialog';
import { colors, Button, TextField } from '@material-ui/core';

// classes for styling need to be created

class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
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
    

    deleteEntry = (entry) => {
        AppAPI.getAPI().deleteListEntry(entry).then(() => {
            this.props.loadListEntries()
        })
    }

    render() {
        const { listEntry } = this.props;
        const { open } = this.state
        return (
            <div >
                <TableRow width="100%">
                    
                    <TableCell style={{paddingLeft: 5, paddingTop: 0, paddingBottom: 0, paddingRight: 10}} width="10%" align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell padding="none" width="15%" align="left">{listEntry.getUnit()}</TableCell>
                    <TableCell padding="none" width="56%" align="left">{listEntry.getName()}</TableCell>
                    <TableCell padding="none" width="6%">
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                   
                    <TableCell style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 15}} width="6%" align='right'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.deleteEntry(listEntry)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Table size="small" aria-label="purchases">
                            <TableHead >
                                <TableRow>
                                    <TableCell style={{borderBottom: "none"}} colSpan={3} padding="none" width="30%" align="left">Einkäufer</TableCell>
                                    <TableCell colSpan={2} padding="none" width="20%" align="left">Händler</TableCell>
                                    <TableCell colSpan={4} padding="none" width="40%" align="left">Geändert</TableCell>
                                    <TableCell colSpan={1} padding="none" width="10%" align="left">STD</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableCell colSpan={3} padding="none" width="30%" align="left">{listEntry.getPurchasingUserId()}</TableCell>
                                <TableCell colSpan={2} padding="none" width="20%" align="left">{listEntry.getRetailerId()}</TableCell>
                                <TableCell colSpan={4} padding="none" width="40%" align="left">{listEntry.getLastUpdated()}</TableCell>
                                <TableCell colSpan={1} padding="none" width="10%" align='left'>
                                    <IconButton aria-label="expand row" size="small" >
                                        {listEntry.isStandardarticle() ?  <StarIcon /> : <StarBorderIcon />}
                                    </IconButton>
                                </TableCell>
                                
                            </TableBody>
                        </Table>
                    </Collapse>
                    </TableCell>
                </TableRow>
                
            </div>
        );
    }
}

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: [],
            openDialog: false,
            textInput: "",
            //userId : this.props.user.getId(),
            userId: "1003",

            
        }
    }

    componentDidMount(){
        if(this.state.userId){
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
  
    loadListEntries = () => {
        console.log("Current user id:", this.state.userId)
        // get listentries by user ID
        AppAPI.getAPI().getListEntriesByUserId(this.state.userId).then(listEntries => {
            console.log("Loaded list entries for user '" + this.state.userId + "':", listEntries)
            var listEntryTableElements = listEntries.map((listEntry) => <ListEntry listEntry={listEntry} loadListEntries={this.loadListEntries} />)

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
    filterByArticleName = (e) => {
        this.setState({textInput: e.target.value})
        console.log(this.state.listEntryTableElements)
        
        // listentrytableelements aus state filtern
        // nur objekte mit entsprechendem Namen anzeigen
        
        
    }

   

    render() {
        return (
            <div display='flex'>
            
            <TextField
                      type="text"
                      onChange={this.filterByArticleName}
                      margin="dense"
                      id="combo-article"
                      variant="standard"
                      label="Nach Artikelname filtern"
                  />
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
            
            
            </div>
        )
    }
}


export default ListEntryTable;