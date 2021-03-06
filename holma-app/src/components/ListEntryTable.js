import DateFnsUtils from '@date-io/date-fns';
import { Button, colors, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAPI from '../api/AppAPI';
import ListEntryAddDialog from './dialogs/ListEntryAddDialog';
import ListEntry from './ListEntry';

/**
 * Es werden die gesamten Listeneinträge einer Shoppinglist gesammelt in einer Tabelle ausgegeben.
 * 
 * Es können neue Listeneinträge durch das Ansprechen von 'ListEntryAddDialog' der Shoppingliste hinzugefügt werden
 * 
 * Die enthaltenene Filterfunktion kann durch das Angeben eines Artikels, Einkäufers, Händlers oder einem Zeitraum die gesamten Listeneinträge filtern.
 * 
 * Durch die enthaltene Sortierfunktion können die Listeneinträge nach einem ausgewählten Attributs sortiert werden.
 * 
 * Die letzte Änderung wird durch das Ändern eines Listeneintrags aktualisiert und markiert somit die letzte Änderung in einer Shoppinglist.
 * 
 * Die Details einer Shoppinglist können durch den Button 'Details' aufgerufen werden.
 */


class ShoppingListLink extends Component{
    render(){
        return(
            <Button align="center" variant="contained" fullWidth  color="primary" >
                Details
            </Button>
        )
    }
  }

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: this.props.match.params.groupId,
            shoppingListId: this.props.match.params.shoppingListId,
            listEntryTableElements: [],
            filteredListEntryTableElements: [],
            retailers: [],
            users: [],
            articles: [],
            articlesCount: 0,
            openDialog: false,
            liseEntry: "",
            shoppingListName: "",
            filterArticleName: "",
            filterRetailerName: "",
            filterPurchasingUserName: "",
            filterChecked: "all",
            filterStartDate: null,
            filterEndDate: null,
            filterOpen: "none",
            filterText: "Filter anzeigen",
        }
    }

    

    componentDidMount(){
        if(this.state.shoppingListId) {
            this.loadShoppingListName()
            this.loadListEntries()
            this.loadRetailers()
            this.loadArticles()
            this.loadUsers()
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

    // Muss noch verschoben werden in GroupList.js!!
    loadRetailers = () => {
        return AppAPI.getAPI().getRetailers().then((retailers) => {
            this.setState({
                retailers: retailers,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            });
            return new Promise(function (resolve) {resolve(retailers)})
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
        );  
    } 
    
    loadShoppingListName = () => {
        AppAPI.getAPI().getShoppingListById(this.props.match.params.shoppingListId).then((shoppingList) => {
            this.setState({
                shoppingListName: shoppingList.name,
                lastUpdated: shoppingList.lastUpdated,
            })
        })
    }

    loadUsers = () => {
        return AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then((users) => {
            this.setState({
                users: users,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            });
            return new Promise(function (resolve) {resolve(users)})
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
        );  
    } 

    loadArticles = () => {
        return AppAPI.getAPI().getArticlesByGroupId(this.state.groupId).then((articles) => {
            this.setState({
                articles: articles,
                loadingInProgress: true, // loading indicator 
                loadingError: null,
            });
            return new Promise(function (resolve) {resolve(articles)})
        }).catch(e =>
            this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
            })
        );  
    } 
    
    // dropdown selector for what fo filter
    filterInput = () => {
        const { filterArticleName,  filterRetailerName, filterPurchasingUserName, filterChecked, filterStartDate, filterEndDate, listEntryTableElements} = this.state
        
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

        if (filterPurchasingUserName !== "") {
            filteredElements =  filteredElements.filter(function(item) {
                return item.props.listEntry.purchasingUser.getName().toLocaleLowerCase().includes(filterPurchasingUserName.toLocaleLowerCase());
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
        else if (sortInput === "Einkäufer") {
            //nach Einkäufer sortieren
            filteredElements = filteredElements.sort((a, b) => 
                a.props.listEntry.purchasingUser.getName() > b.props.listEntry.purchasingUser.getName() ? 1 : -1)
        }
        else if (sortInput === "Kaufdatum") {
            //nach Kaufdatum sortieren           
            filteredElements = filteredElements.sort((a, b) => 
                Date.parse(a.props.listEntry.checkedTs) < Date.parse(b.props.listEntry.checkedTs) ? 1 : -1)
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
        const listEntries = await AppAPI.getAPI().getListEntriesByShoppingListId(this.state.shoppingListId)
        for (const listEntry of listEntries) {
            await AppAPI.getAPI().completeListEntry(listEntry)
        }
        var listEntryTableElements = listEntries.map((listEntry) => 
            <ListEntry 
                listEntry={listEntry} 
                loadListEntries={this.loadListEntries} 
                retailers={this.state.retailers}
                users={this.state.users}
                articles={this.state.articles}
                loadArticles={this.loadArticles}
                groupId={this.state.groupId}
            />
        )

        this.setState({
            listEntryTableElements: listEntryTableElements,
            filteredListEntryTableElements: listEntryTableElements,
            loadingInProgress: true, // loading indicator 
            loadingError: null,
        })
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
        this.loadListEntries()
        this.filterInput();
    }

    clearStartDateInput = () => {
        this.setState({
            filterStartDate: null,
        })
        this.loadListEntries()
        this.filterInput();
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
                name: "Einkäufer",
            },
            {
                name: "letzte Änderung",
            },
        ]
        const {retailers, users, filterArticleName, filterPurchasingUserName, filterRetailerName, filterChecked, filterStartDate, filterEndDate, filteredListEntryTableElements, userName} = this.state;
        
        var listLastUpdated = ""
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
          }
        let lud = new Date(this.state.lastUpdated).addHours(2)
        let luds = lud.toString()
        listLastUpdated = luds.substring(4, 21)
        
        return (
            <React.Fragment>
                <Box m={1} />
                <Card className="root" style={{minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: "ffffff"}}>                
                    <CardContent>
                    <Grid container direction="row" justify="space-between" alignItems="center" spaching={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Shoppingliste: </b>{this.state.shoppingListName}</Typography>
                            <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Id: </b>{this.props.match.params.shoppingListId}</Typography>
                        </Grid>
                        <Grid item xs={0} sm={2} ></Grid>
                        <Grid item xs={12} sm={4} align="left">
                            <Typography className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Letzte Änderung: </b>{listLastUpdated}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="space-between" alignItems="center" spaching={2}>
                        <Grid item xs={12} sm={4} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                            <Link to={"/shoppinglistedit/" + this.props.match.params.shoppingListId} style={{textDecoration: 'none'}}>
                                <ShoppingListLink/>
                            </Link>
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
                                )} />
                        </Grid>
                    </Grid>
                    </CardContent>   
                </Card>
                <Box m={1} />
                
                <Grid container direction="row" justify="space-between" alignItems="center" component={Paper} style={{marginTop: 15, display: this.state.filterOpen}}>
                    <Grid item xs={12} sm={12} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Typography color="primary" style={{paddingTop: 20, fontSize: 18}}>
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
                                id="filterPurchasingUserName"
                                onChange={(event, value) => this.handleInputChangeAutoComplete("filterPurchasingUserName", value)}
                                options={users} //liste der retailer laden
                                defaultValue={filterPurchasingUserName}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => (
                                    <TextField {...params} variant="standard" label="Einkäufer" placeholder="Einkäufer" />
                                )}                
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
                                label="letzte Änderung Start"
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
                                label="letzte Änderung Ende"
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
                <TableContainer  component={Paper} style={{marginTop: 15}}>
                    <Table>
                        <TableHead style={{backgroundColor: colors.teal[600]}}>
                            <TableRow>
                                <TableCell align="left"/>
                                <TableCell align="right"><b style={{ color: '#ffffff'}}></b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Menge</b></TableCell>
                                <TableCell align="left"><b style={{ color: '#ffffff'}}>Artikel</b></TableCell>
                                <TableCell/>
                                <TableCell/>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredListEntryTableElements}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box m={10} />
                <ListEntryAddDialog
                    loadListEntries={this.loadListEntries} 
                    retailers={this.state.retailers}
                    users={this.state.users}
                    articles={this.state.articles}
                    loadArticles={this.loadArticles}
                    groupId={this.state.groupId}
                    openDialog={this.openDialog}
                    open={this.state.openDialog}
                    handleClose={this.handleClose}
                    shoppingListId={this.state.shoppingListId}
                />
            </React.Fragment>
            
        )
    }
}


export default ListEntryTable;