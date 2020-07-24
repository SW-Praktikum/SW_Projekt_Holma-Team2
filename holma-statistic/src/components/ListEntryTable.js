import DateFnsUtils from '@date-io/date-fns';
import { Button, Checkbox, colors, TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';

/**
 * Es werden die gesamten Listeneinträge einer Shoppinglist gesammelt in einer Tabelle ausgegeben.
 * 
 * Die enthaltenene Filterfunktion kann durch das Angeben eines Artikels, Einkäufers, Händlers oder einem Zeitraum die gesamten Listeneinträge filtern.
 * 
 * Durch die enthaltene Sortierfunktion können die Listeneinträge nach einem ausgewählten Attributs sortiert werden.
 * 
 * Die letzte Änderung wird durch das Ändern eines Listeneintrags aktualisiert und markiert somit die letzte Änderung in einer Shoppinglist.
 */

class RetailerEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            retailerEntry: this.props.retailerEntry,
        }
    }


    
    render() {
        const { retailerEntry} = this.props;
        return (
            <React.Fragment>
                <Grid item xs={12} sm={4} style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>
                    <Card style={{backgroundColor: "#F4F6F8"}}>
                        <CardContent>
                            <Typography color="primary" style={{fontSize: 18}}>
                                <b>{retailerEntry.getName()}</b>
                            </Typography>
                            <Typography style={{fontSize: 18}}>
                                {retailerEntry.count} Artikel gekauft
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </React.Fragment>
        );
    }
}


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntry: this.props.listEntry,
        }
    }


    
    render() {
        const { listEntry} = this.props;
        var checkedTimestamp = ""

        if (listEntry.getCheckedTs() !== null) {
            let checkedTs = new Date(listEntry.getCheckedTs())
            let checkedTs_str = checkedTs.toString()
            checkedTimestamp = checkedTs_str.substring(4, 21)
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
                    <TableCell padding="dense" align="left">{listEntry.retailer.getName()}</TableCell> 
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
            UserRetailer: [],
            filteredListEntryTableElements: [],
            userId : this.props.user.getId(),
            userName: this.props.user.getName(),
            open: false,
            retailers: [],
            userRetailer: [],
            filterArticleName: "",
            filterRetailerName: "",
            filterPurchasingUserName: "",
            filterChecked: true,
            filterStartDate: null,
            filterEndDate: null,
            filterOpen: "none",
            filterText: "Filter anzeigen",
        }
    }

    componentDidMount(){
        if(this.state.userId){
            this.loadRetailers()
            this.loadUserRetailers()
            this.loadListEntries().then(() => {
                this.filterInput()
            })
          }
    }




    // dropdown selector for what fo filter
    filterInput = () => {
        const { filterArticleName,  filterRetailerName, filterChecked, filterStartDate, filterEndDate, listEntryTableElements} = this.state
        
        var filteredElements = listEntryTableElements

        if (filterArticleName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.article.getName().toLocaleLowerCase().includes(filterArticleName.toLocaleLowerCase());
            });
        }

        if (filterRetailerName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.retailer.getName().toLocaleLowerCase().includes(filterRetailerName.toLocaleLowerCase());
            });
        }

        if (filterChecked == true) {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.checked == true;
            });
        }
        if (filterChecked == false) {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.checked == false;
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

    handleSort = (e, value) => {
        // sortieren von Listeneinträgen
        if (value === null) {
            var filteredElements = this.state.filteredListEntryTableElements
        }
        else {
            var sortInput = value.name
            var filteredElements = this.state.filteredListEntryTableElements
        }
           
        if (sortInput === "Händler") {
            //nach Einzelhändler sortieren
            filteredElements = filteredElements.sort((a, b) => 
                a.props.listEntry.retailer.getName() > b.props.listEntry.retailer.getName() ? 1 : -1)
        }
        else if (sortInput === "Artikel") {
            //nach Artikel sortieren
            filteredElements = filteredElements.sort((a, b) => 
                a.props.listEntry.article.getName() > b.props.listEntry.article.getName() ? 1 : -1)
        }
        else if (sortInput === "Kaufdatum") {
            //nach Kaufdatum sortieren           
            filteredElements = filteredElements.sort((a, b) => 
                Date.parse(a.props.listEntry.checkedTs) < Date.parse(b.props.listEntry.checkedTs) ? 1 : -1)
        }
        this.setState({
            filteredListEntryTableElements: filteredElements
        })
    }
    
    loadListEntries = async () => {
        // get listentries by user ID
        const listEntries = await AppAPI.getAPI().getListEntriesByUserId(this.state.userId, true)
        for (const listEntry of listEntries) {
            await AppAPI.getAPI().completeListEntry(listEntry)
        }

        var listEntryTableElements = listEntries.map((listEntry) => <ListEntry listEntry={listEntry} loadListEntries={this.loadListEntries} />)
        this.setState({
            listEntryTableElements: listEntryTableElements,
            filteredListEntryTableElements: listEntryTableElements,
            loadingInProgress: true, // loading indicator 
            loadingError: null
        })
    }

    loadUserRetailers = () => {
        return AppAPI.getAPI().getFrequentRetailerByUserId(this.state.userId).then((retailers) => {
            var listEntryTableUserElements = retailers.map((retailer) => <RetailerEntry retailerEntry={retailer} loadListEntries={this.loadListEntries} />)
            this.setState({
            userRetailer: listEntryTableUserElements,
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
    
    loadRetailers = () => {
        AppAPI.getAPI().getRetailers().then((retailers) => {
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

    handleCheckButton = async (check) => {
        await this.setState({filterChecked : check})
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
        this.loadListEntries().then(() => {
            this.filterInput();
        })
    }

    clearStartDateInput = () => {
        this.setState({
            filterStartDate: null,
        })
        this.loadListEntries().then(() => {
            this.filterInput();
        })
    }

    setOpen(bool) {
        this.setState({
            open: bool
        })
    }

    render() {
        const sortFunctions = [
            {
                name: "Artikel",
            },
            {
                name: "Händler",
            },
            {
                name: "Kaufdatum",
            },
        ]
        const {retailers, filterArticleName, filterRetailerName, filterChecked, filterStartDate, filterEndDate, filteredListEntryTableElements, userName, userRetailer, open} = this.state;
        return (
            <React.Fragment>  
                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="center" 
                    component={Paper} 
                    style={{minWidth: '100%', marginBottom:15, marginTop:15, }}
                    >
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>
                            Hallo {userName},
                        </Typography>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>Deine persönliche Statistik:</Typography>
                    </Grid>
                    <Grid item xs={9} sm={6} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography align="right" className="title" style={{fontSize: 16}}>Anzahl Einkäufe nach Einzelhändler</Typography>
                    </Grid>
                    <Grid item xs={3} sm={2} align="left" style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Grid>
                </Grid>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit component={Paper}>
                        <Grid 
                            container 
                            direction="row" 
                            justify="space-between" 
                            alignItems="center" 
                            style={{display: this.state.displayTable, minWidth: '100%', marginBottom:15, marginTop:15, }}
                            >
                            {userRetailer}
                        </Grid>
                    </Collapse>

                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="center" 
                    component={Paper} 
                    style={{display: this.state.displayTable, minWidth: '100%', marginBottom:15, marginTop:15, }}
                    >
                    <Grid item xs={12} sm={4}/>
                        
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Button 
                            variant="contained"
                            fullWidth 
                            color="primary"
                            onClick={this.handleFilterOpen}>
                            {this.state.filterText}
                        </Button>
                    </Grid>
                    
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Autocomplete
                            id="sortSelector"
                            onChange={(event, value) => this.handleSort("sortSelector", value)}
                            options={sortFunctions}
                            defaultValue="filtern"
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                            <TextField {...params} margin="dense" variant="outlined" label="Sortieren" placeholder="Sortieren" />
                            )}                
                        />
                    </Grid>
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
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Radio
                            checked={filterChecked === true}
                            onChange={() => this.handleCheckButton(true)}
                            //value="true"
                            color="primary"
                            name="radio-button"
                            //inputProps={{ 'aria-label': 'TRUE' }}
                        /> abgehakt
                        <Radio
                            checked={filterChecked === false}
                            onChange={() => this.handleCheckButton(false)}
                            //value="d"
                            color="primary"
                            name="radio-button"
                            //inputProps={{ 'aria-label': 'D' }}
                        /> offen
                        <Radio
                            checked={filterChecked === "all"}
                            onChange={() => this.handleCheckButton("all")}
                            //value="e"
                            color="primary"
                            name="radio-button"
                            //inputProps={{ 'aria-label': 'E' }}
                        /> alle
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
                                label="Kauf Startdatum"
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
                                id="date-picker-end"
                                label=" Kauf Enddatum"
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