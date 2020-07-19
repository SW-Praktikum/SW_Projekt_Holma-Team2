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
import { colors, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
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
        var checkedTimestamp = ""

        if (listEntry.getCheckedTs() !== null) {
            let checkedTs = new Date(listEntry.getCheckedTs())
            checkedTimestamp = checkedTs.toDateString()
          }
        return (
            <React.Fragment>
                
                <TableRow >
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
                    <TableCell padding="dense" align="left">{listEntry.getRetailerName()}</TableCell> 
                    <TableCell padding="dense" align="left">{checkedTimestamp}</TableCell> 

                </TableRow>
                
                
            </React.Fragment>
        );
    }
}

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: [],
            filteredListEntryTableElements: [],
            openDialog: false,
            userId : this.props.user.getId(),

            retailers: [],
            retailerName: null,
            filterInput: "",
            filteredElements: [],
            filterObject: "articleName",
            textField: "block",
            timeFilter: "none",
            filterArticleName: "",
            filterRetailerName: "",
            filterPurchasingUserName: "",
            filterChecked: false,
            filterStartDate: null,
            filterEndDate: null
        }
    }

    componentDidMount(){
        if(this.state.userId){
            this.loadListEntries();
            this.loadRetailers()
          }
    }

    // dropdown selector for what fo filter
    filterInput = () => {
        const { filterArticleName,  filterRetailerName, filterPurchasingUserName, filterChecked, 
                filterStartDate, filterEndDate, listEntryTableElements} = this.state
        
        var filteredElements = listEntryTableElements

        if (filterArticleName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.articleName.toLocaleLowerCase().includes(filterArticleName.toLocaleLowerCase());
            });
        }

        if (filterRetailerName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.retailerName.toLocaleLowerCase().includes(filterRetailerName.toLocaleLowerCase());
            });
        }

        if (filterChecked == true) {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.checked == true;
            });
        }

        if ((filterStartDate != null) && (filterStartDate != 0)) {
            var filteredElements =  filteredElements.filter(function(item) {
                const parsedTime = Date.parse(item.props.listEntry.checkedTs)
                return filterStartDate < parsedTime
            })
        }

        if ((filterEndDate != null) && (filterEndDate != 0)) {
            var filteredElements =  filteredElements.filter(function(item) {
                const parsedTime = Date.parse(item.props.listEntry.checkedTs)
                return parsedTime < filterEndDate;
            })
        }

        this.setState({
            filteredListEntryTableElements: filteredElements
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
                filteredListEntryTableElements: listEntryTableElements,
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
    
    handleInputChangeDate = async (key, date) => {
        let datum = new Date (date);
        let convert = datum.getTime();

        if (convert == 0) {
            convert = null
        }
        await this.setState({[key]: convert})
        this.filterInput()

    }

    handleInputChangeTextField = async (e) => {
        let key = e.target.id
        let val = e.target.value

        await this.setState({[key] : val})
        await this.filterInput()
    }

    handleInputChangeCheckbox = async (e) => {
        let key = e.target.id
        let val = e.target.checked

        await this.setState({[key] : val})
        await this.filterInput()
    }

    handleInputChangeAutoComplete = async (key, obj) => {
        let val = ""
        if (obj !== null) {
            val = obj.getName()
        }
        
        await this.setState({[key] : val})
        this.filterInput()
    }
    

    render() {
        const {retailers, filterArticleName, filterRetailerName, filterChecked, filterStartDate, filterEndDate, filteredListEntryTableElements} = this.state;
        return (
            <React.Fragment>
                <Grid container direction="row" justify="space-between" alignItems="center" component={Paper} style={{marginTop: 15}}>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography color="primary" style={{fontSize: 18}}>
                            Filter nach:
                        </Typography> 
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <TextField
                                autoFocus
                                onChange={this.handleInputChangeTextField}
                                margin="dense"
                                id="filterArticleName"
                                label="Artikel"
                                type="ID"
                                fullWidth
                                value={filterArticleName}
                            /> 
                        </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>

                        <Autocomplete
                            id="filterRetailerName"
                            onChange={(event, value) => this.handleInputChangeAutoComplete("filterRetailerName", value)}
                            options={retailers} //liste der retailer laden
                            defaultValue={filterRetailerName}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <TextField {...params} variant="standard" label="Händler" placeholder="Händler" />
                            )}                
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id="filterChecked"
                                    checked={filterChecked}
                                    onChange={this.handleInputChangeCheckbox}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label="Gekauft"
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                fullWidth
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-start"
                                label="Startdatum"
                                value={filterStartDate}
                                onChange={(date) => this.handleInputChangeDate("filterStartDate", date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                defaultDate={null}

                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                                disableToolbar
                                fullWidth
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-start"
                                label="Enddatum"
                                value={filterEndDate}
                                onChange={(date) => this.handleInputChangeDate("filterEndDate", date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                defaultDate={null}
                            />
                        
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <TableContainer style={{marginTop: 15}} component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead style={{backgroundColor: colors.teal[600]}}>
                            <TableRow>
                                <TableCell/>
                                <TableCell/>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Artikel</b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Händler</b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Gekauft</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredListEntryTableElements}
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        )
    }
}


export default ListEntryTable;