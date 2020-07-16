import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
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
import { colors, Button, TextField, Checkbox } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntry: this.props.listEntry,
        }
    }
    
    render() {
        const { listEntry } = this.props;
        const { open } = this.state
        return (
            <div >
                <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'50%'}}/>
                    <col style={{width:'40%'}}/>
                    <col style={{width:'40%'}}/>
                </colgroup>
                <TableRow width="100%">
                    <TableCell padding="checkbox" >
                        <Checkbox
                            color="primary"
                            checked={listEntry.getChecked()}
                            disabled="true"
                        />
                    </TableCell>
                    <TableCell style={{paddingLeft: 5, paddingTop: 0, paddingBottom: 0, paddingRight: 10}} align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell padding="dense" align="left">{listEntry.getUnit()}</TableCell>
                    <TableCell padding="dense" align="left">{listEntry.getName()}</TableCell>
                    <TableCell padding="dense" align="right">{listEntry.getRetailerName()}</TableCell> 
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
            userId : this.props.user.getId(),
            startDate: null,
            endDate: null,
            retailers: [],
            retailerName: null,
            filterInput: "",
            filteredElements: []
        }
    }

    componentDidMount(){
        if(this.state.userId){
            this.loadListEntries();
            this.loadRetailers()
          }
    }

    filterInput = (inputValue) => {
        var filteredElements =  this.state.listEntryTableElements.filter(function(item) {
            return item.props.listEntry.articleName == inputValue;
        });
        
        this.loadFilteredElements(filteredElements)
    }

    loadFilteredElements = (filteredElements) => {
        console.log(filteredElements)
        // Hier die gefilterten Objekte Rendern/Mappen, auch die von filterByTimePeriod
    }

    handleInputChange = (e) => {
        this.setState({filterInput: e.target.value})
        this.filterInput(e.target.value)
    }

    // wir bei Button Click aufgerufen
    filterByTimePeriod = () => {
        AppAPI.getAPI().getUpdatedListEntriesByTimePeriod(this.state.startDate, this.state.endDate).then((filteredElements) => {
            // filter Elements only for current user needs to be done here first
            // otherwise all listEntries from the Database will be loaded
            this.loadFilteredElements(filteredElements)
        })
    }


  
    loadListEntries = () => {
        console.log("hier")
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
    
    // install: npm i @date-io/date-fns
    // install: npm i @material-ui/pickers
    // install: npm i date-fns
    
   handleStartDate = (date) => {
    var datum = new Date (date);
    var convert = datum.toISOString();
    this.setState({startDate: convert})
   }

   handleEndDate = (date) => {
    var datum = new Date (date);
    var convert = datum.toISOString();
    this.setState({endDate: convert})
   }

   // doku for the date library: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Several_ways_to_create_a_Date_object

   filterByRetailer = (event, retailer) => {
    if (retailer === null) {
        this.loadListEntries()
    }
    else {
        console.log(retailer)
        console.log("Die Id des Händlers:", retailer.id)
        this.setState({retailerName: retailer.name})
        this.loadListEntriesByRetailer(retailer.id) 
   }}

   loadListEntriesByRetailer = (retailerId) => {
    console.log("Current Retailer id:", retailerId)
    // get listentries by Retailer ID
    AppAPI.getAPI().getListEntriesByRetailerId(retailerId).then(listEntries => {
        console.log("Loaded list entries for retailer '" + retailerId + "':", listEntries)
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
   


    render() {
        const {retailers} = this.state;
        return (
            <div display='flex'>
            <Button onClick={this.filterByTimePeriod}>Filter nach Zeit</Button>
            <TextField
              autoFocus
              onChange={this.handleInputChange}
              margin="dense"
              id="outlined-basic"
              variant="outlined"
              label="Arikel Name"
              type="ID"
              fullWidth
              value={this.state.filterInput}        
            />            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container direction="row" justify="space-between" alignItems="center" component={Paper} style={{marginTop: 10, marginBottom: 10}}>
                <Grid item xs={12} sm={12} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10}}>
                    <Typography color="primary" style={{fontSize: 18}}>
                        Nach Zeitaum filtern
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-start"
                    label="Startdatum"
                    value={this.state.startDate}
                    onChange={(date) => this.handleStartDate(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-end"
                    label="Enddatum"
                    value={this.state.endDate}
                    onChange={(date) => this.handleEndDate(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </Grid>
                </Grid>
            </MuiPickersUtilsProvider>
            <Grid container direction="row" justify="space-between" alignItems="center" component={Paper}>
                <Grid item xs={12} sm={6} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                    <Typography color="primary" style={{fontSize: 18}}>
                        Nach Einzelhändler filtern
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                    <Autocomplete
                        id="combo-retailer"
                        onChange={this.filterByRetailer}
                        options={retailers} //liste der retailer laden
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option) => option.name}
                        renderInput={(params) => (
                            <TextField {...params} variant="standard" label="Händler" placeholder="Händler" />
                        )}                
                    />
                </Grid>
            </Grid>
            <TableContainer style={{marginTop: 20}} component={Paper}>
                <Table aria-label="collapsible table">
                <colgroup>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'10%'}}/>
                    <col style={{width:'20%'}}/>
                    <col style={{width:'30%'}}/>
                    <col style={{width:'30%'}}/>
                </colgroup>
                    
                    <TableHead style={{backgroundColor: colors.teal[600]}}>
                        
                        <TableRow>
                            <TableCell align="left"></TableCell>
                            <TableCell align="right"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                            <TableCell align="left"><b style={{ color: '#ffffff'}}>Artikel</b></TableCell>
                            <TableCell align="left"><b style={{ color: '#ffffff'}}>Händler</b></TableCell>
                            
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