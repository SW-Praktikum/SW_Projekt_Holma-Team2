import React, { Component } from 'react';
import AppAPI from '../../api/AppAPI';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { colors, Button, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';

import DateFnsUtils from '@date-io/date-fns';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntry: this.props.listEntry,
            userId : this.props.userId,
            checked: this.props.listEntry.getChecked(),
        }
    }

    handleChangeCheck = (e) => {
      this.setState({
          checked: e.target.checked
      })
      this.state.listEntry.setChecked(e.target.checked)
      AppAPI.getAPI().updateListEntry(this.state.listEntry)
    }

    



    render() {
        const { listEntry } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                            color="primary"
                            checked={this.state.checked}
                            onChange={this.handleChangeCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </TableCell>
                    <TableCell padding="none" style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 5}} align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell padding="none" align="left">{listEntry.getUnit()}</TableCell>
                    <TableCell padding="none" align="left">{listEntry.getName()}</TableCell>
                    <TableCell padding="none" align="left">{listEntry.getRetailerName()}</TableCell> 
                    <TableCell padding="none" align="left">{listEntry.getShoppingListName()}</TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}

class Startpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayTable: "none",
            displayEmptyTable: "",
            listEntryTableElements: [],
            filteredListEntryTableElements: [],
            openDialog: false,
            userId : this.props.user.getId(),
            userName: this.props.user.getName(),
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
            filterEndDate: null,
            filterOpen: "none",
            filterText: "Filter anzeigen",
            filterShoppingListName: "",
        }
    }

    componentDidMount(){
        if(this.state.userId){
            this.loadListEntries();
            this.loadRetailers()
          }
    }

    

    loadListEntries = () => {
        console.log("Current user id:", this.state.userId)

        // get listentries by user ID
        AppAPI.getAPI().getListEntriesByUserId(this.state.userId).then(listEntries => {
            if (listEntries.length !== 0) {
                this.setState({
                    displayTable: "",
                    displayEmptyTable: "none"
                })
            }
            else {
                this.setState({
                    displayTable: "none",
                    displayEmptyTable: ""
                })
            }
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





    // dropdown selector for what fo filter
    filterInput = () => {
        const { filterArticleName,  filterShoppingListName, filterRetailerName, filterPurchasingUserName, filterChecked, 
                filterStartDate, filterEndDate, listEntryTableElements} = this.state
        
        var filteredElements = listEntryTableElements

        if (filterArticleName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.articleName.toLocaleLowerCase().includes(filterArticleName.toLocaleLowerCase());
            });
        }

        if (filterShoppingListName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.shoppingListName.toLocaleLowerCase().includes(filterShoppingListName.toLocaleLowerCase());
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
                const parsedTime = Date.parse(item.props.listEntry.lastUpdated)
                return filterStartDate < parsedTime
            })
        }

        if ((filterEndDate != null) && (filterEndDate != 0)) {
            var filteredElements =  filteredElements.filter(function(item) {
                const parsedTime = Date.parse(item.props.listEntry.lastUpdated)
                return parsedTime < filterEndDate;
            })
        }

        this.setState({
            filteredListEntryTableElements: filteredElements
        })
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

    handleInputChangeTextFieldList = async (e) => {
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
    
    handleFilterOpen = () => {
        if (this.state.filterOpen === "none") {
            this.setState({
                filterOpen: "",
                filterText: "Filter ausblenden"
            })
        }

        else {
            this.setState({
                filterOpen: "none",
                filterText: "Filter anzeigen"
            })
        }
    }

    clearEndDateInput = () => {
        this.setState({
            filterEndDate: null
        })
        this.loadListEntries()
    }

    clearStartDateInput = () => {
        this.setState({
            filterStartDate: null,
        })
        this.loadListEntries()
    }










    render() {
        const {retailers, filterArticleName, filterShoppingListName,filterRetailerName, filterChecked, filterStartDate, filterEndDate, filteredListEntryTableElements} = this.state;
        return (
            <React.Fragment>             
                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="center" 
                    component={Paper} 
                    style={{display: this.state.displayTable, minWidth: '100%', marginBottom:15, marginTop:15, }}
                    >
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>
                            Hallo {this.state.userName},
                        </Typography>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>Deine persönliche Einkaufsliste:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Button 
                            variant="contained"
                            fullWidth 
                            color="primary"
                            onClick={this.handleFilterOpen}>
                            {this.state.filterText}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                </Grid>
                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="center" 
                    component={Paper} 
                    style={{display: this.state.displayEmptyTable, minWidth: '100%', marginBottom:15, marginTop:15, }}
                    >
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>
                            Hallo {this.state.userName},
                        </Typography>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>Du hast noch keine Listeneinträge die dir zugeordnet sind.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Button 
                            variant="contained"
                            fullWidth 
                            color="primary"
                            onClick={this.handleFilterOpen}>
                            {this.state.filterText}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                </Grid>
                
                <Grid container direction="row" justify="space-between" alignItems="center" component={Paper} style={{marginTop: 15, display: this.state.filterOpen}}>
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
                    <Grid item xs={10} sm={3} style={{paddingLeft: 20, paddingRight: 0, paddingTop: 10, paddingBottom: 10}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                                disableToolbar
                                fullWidth
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-start"
                                label="Geändert Startdatum"
                                value={filterStartDate}
                                onChange={(date) => this.handleInputChangeDate("filterStartDate", date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                defaultDate={null}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={2} sm={1} align="right" style={{paddingLeft: 0, paddingRight: 15, paddingTop: 18, paddingBottom: 0}}>
                        <IconButton padding="none" aria-label="expand row" size="small" onClick={this.clearStartDateInput}>
                                <ClearIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={10} sm={3} style={{paddingLeft: 20, paddingRight: 0, paddingTop: 10, paddingBottom: 10}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                                disableToolbar
                                fullWidth
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-start"
                                label="Geändert Enddatum"
                                value={filterEndDate}
                                onChange={(date) => this.handleInputChangeDate("filterEndDate", date)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                defaultDate={null}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={2} sm={1} align="right" style={{paddingLeft: 0, paddingRight: 15, paddingTop: 18, paddingBottom: 0}}>
                        <IconButton padding="none" aria-label="expand row" size="small" onClick={this.clearEndDateInput}>
                                <ClearIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <TextField
                                autoFocus
                                onChange={this.handleInputChangeTextFieldList}
                                margin="dense"
                                id="filterShoppingListName"
                                label="Shoppinglist"
                                type="ID"
                                fullWidth
                                value={filterShoppingListName}
                            /> 
                    </Grid>
                </Grid>
                
                
                
                
                
                
                <TableContainer component={Paper} style={{display: this.state.displayTable}}>
                    <Table aria-label="collapsible table">                   
                        <TableHead style={{backgroundColor: colors.teal[600]}}>
                            <TableRow>
                                <TableCell 
                                    style={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15, paddingRight: 0}}/>
                                <TableCell 
                                    style={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15, paddingRight: 0}}/>
                                <TableCell 
                                    style={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15, paddingRight: 0}} 
                                    align="left"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                                <TableCell 
                                    style={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15, paddingRight: 0}} 
                                    align="left"><b style={{ color: '#ffffff'}}>Artikel</b></TableCell>
                                <TableCell 
                                    style={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15, paddingRight: 0}} 
                                    align="left"><b style={{ color: '#ffffff'}}>Händler</b></TableCell>
                                <TableCell 
                                    style={{paddingLeft: 0, paddingTop: 15, paddingBottom: 15, paddingRight: 0}} 
                                    align="left"><b style={{ color: '#ffffff'}}>Liste</b></TableCell>
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
export default Startpage;