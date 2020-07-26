import { Button, Checkbox, colors, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { Component } from 'react';
import AppAPI from '../../api/AppAPI';


/**
 * Das ist die erste Seite, die der Benutzer nach dem erfolgreichen Anmelden angezeigt wird. Darin werden die dem Benutzer zugeordneten Listeneinträge angezeigt.
 * 
 * Die Startseite stellt die persönliche Einkaufsliste dar, mit der ein Benutzer eine Übersicht über seine zu erledigenden Einkäufe erhält.
 * 
 * Durch die vorhandene Checkbox kann ein Listeneintrag abgehakt und somit als erledigt gekennzeichnet werden.
 * 
 */

class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userId : this.props.userId,
            checked: this.props.listEntry.getChecked(),
            open: false
        }
    }

    handleChangeCheck = (e) => {
      this.setState({
          checked: e.target.checked
      })
      var listEntryChecked = this.props.listEntry
      listEntryChecked.setChecked(e.target.checked)
      AppAPI.getAPI().updateListEntry(listEntryChecked)
    }

    setOpen(bool) {
        this.setState({
            open: bool
        })
    }

    render() {
        const { listEntry } = this.props;
        const { open } = this.state;
        const classes = {
            root: {
              position: 'fixed'
            },
            tableCell: {
                borderBottom: "none"
            }
        }

        var groupLastUpdated = ""

        if (listEntry.getLastUpdated() !="") {
            Date.prototype.addHours = function(h) {
                this.setTime(this.getTime() + (h*60*60*1000));
                return this;
              }
            let lud = new Date(listEntry.getLastUpdated()).addHours(2)
            let luds = lud.toString()
            groupLastUpdated = luds.substring(4, 21)
          }

        return (
            <React.Fragment>
                <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                            color="primary"
                            checked={listEntry.getChecked()}
                            onChange={this.handleChangeCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </TableCell>
                    <TableCell padding="none" style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 5}} align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell padding="none" align="left">{listEntry.getUnit()}</TableCell>
                    <TableCell padding="none" align="left">{listEntry.article.getName()}</TableCell>
                    <TableCell padding="none" align="left">{listEntry.retailer.getName()}</TableCell> 
                    <TableCell padding="none" >
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell style={{borderBottom: "none"}} colSpan={3} padding="none" align="left">Einkaufsliste</TableCell>
                                            <TableCell style={{borderBottom: "none"}} colSpan={4} padding="none" align="left">Geändert</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell style={{borderBottom: "none"}} colSpan={3} padding="none" align="left">{listEntry.shoppingList.getName()}</TableCell>
                                        <TableCell style={{borderBottom: "none"}} colSpan={4} padding="none" align="left">{groupLastUpdated}</TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>    
                </TableRow>

            </React.Fragment>
        );
    }
}

class Startpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: [],
            userId : this.props.user.getId(),
            userName: this.props.user.getName(),
            displayTable: "",
            displayEmptyTable: "none",
            retailers: [],
            filterArticleName: "",
            filterListName: "",
            filterRetailerName: "",
            filterPurchasingUserName: "",
            filterChecked: false,
            filterStartDate: null,
            filterEndDate: null,
            filterOpen: "none",
            filterText: "Filter anzeigen",
        }
    }

    async componentDidMount(){
        if(this.state.userId){
            this.loadRetailers()
            this.loadListEntries().then(() => {
                this.filterInput()
                this.displayRelevant()
            })

            try {
                setInterval(async() => {
                        this.loadListEntries().then(() => {
                        this.filterInput()
                        this.displayRelevant()
                        })
                }, 5000)
            } catch(e) {
                console.log("Error while fetching in loop", e)
            }
        }
    }


    displayRelevant = () => {
        try {
            if (this.state.filteredListEntryTableElements.length !== 0) {
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
          } catch (error) {
            // error occured
          }
    }


    // dropdown selector for what fo filter
    filterInput = () => {
        const { filterArticleName,  filterListName, filterRetailerName, filterChecked, filterStartDate, filterEndDate, listEntryTableElements} = this.state
        
        var filteredElements = listEntryTableElements

        if (filterArticleName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.article.getName().toLocaleLowerCase().includes(filterArticleName.toLocaleLowerCase());
            });
        }

        if (filterListName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.shoppingList.getName().toLocaleLowerCase().includes(filterListName.toLocaleLowerCase());
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
        else if (sortInput === "Liste") {
            //nach Shoppinglist sortieren
            filteredElements = filteredElements.sort((a, b) => 
                a.props.listEntry.shoppingList.getName() > b.props.listEntry.shoppingList.getName() ? 1 : -1)
        }
        else if (sortInput === "letzte Änderung") {
            //nach letzter Änderung sortieren
            filteredElements = filteredElements.sort((a, b) => 
                Date.parse(a.props.listEntry.lastUpdated) < Date.parse(b.props.listEntry.lastUpdated) ? 1 : -1)
        }
        this.setState({
            filteredListEntryTableElements: filteredElements
        })
    }


    loadListEntries = async () => {
        // get listentries by user ID
        const listEntries = await AppAPI.getAPI().getListEntriesByUserId(this.state.userId, false)
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

    render() {
        const sortFunctions = [
            {
                name: "Artikel",
            },
            {
                name: "Händler",
            },
            {
                name: "Liste",
            },
            {
                name: "letzte Änderung",
            },
        ]
        const {retailers, filterArticleName, filterListName, filterRetailerName, filterChecked, filterStartDate, filterEndDate, filteredListEntryTableElements, userName} = this.state;
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
                            Hallo {userName},
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

                <Grid 
                    container 
                    direction="row" 
                    justify="space-between" 
                    alignItems="center" 
                    component={Paper} 
                    style={{display: this.state.displayEmptyTable, minWidth: '100%', marginBottom:15, marginTop:15, }}
                    >
                    <Grid item xs={12} sm={12} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>
                            Hallo {userName},
                        </Typography>
                        <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>Du hast aktuell keine Listeneinträge zu erledigen.</Typography>
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
                    <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <TextField
                            autoFocus
                            onChange={this.handleInputChangeTextField}
                            margin="dense"
                            id="filterListName"
                            label="Liste"
                            type="ID"
                            fullWidth
                            value={filterListName}
                        /> 
                    </Grid>  
                    <Grid item xs={12} sm={4}/>
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
                                    align="left"><b style={{ color: '#ffffff'}}>Händler</b>
                                </TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {filteredListEntryTableElements}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={10} />
            </React.Fragment>
        )
    }
}
export default Startpage;