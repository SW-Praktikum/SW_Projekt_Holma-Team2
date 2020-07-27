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
 * Es wird die Statistik einer ausgewählten Gruppe dargestellt.
 * Die enthaltenene Filterfunktion kann durch das Angeben eines Artikels, Einkäufers, Händlers oder einem Zeitraum die gesamten Listeneinträge filtern.
 * Durch die enthaltene Sortierfunktion können die Listeneinträge nach einem ausgewählten Attributs sortiert werden.
 * 
 * Die angegebenen 'Häufigsten Artikel' stellen die Gesamtanzahl der bisherigen Einkäufe jedes Artikels dar.
 * Dabei werden die Einträge nach Häufigkeit absteigend dargestellt.
 */
  

class AmountEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amountEntry: this.props.retailerEntry,
        }
    }


    
    render() {
        const { amountEntry} = this.props;
        return (
            <React.Fragment>
                <Grid item xs={12} sm={4} style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10}}>
                    <Card style={{backgroundColor: "#F4F6F8"}}>
                        <CardContent>
                            <Typography color="primary" style={{fontSize: 18}}>
                                <b>{amountEntry.getName()}</b>
                            </Typography>
                            <Typography style={{fontSize: 18}}>
                                {amountEntry.count} mal gekauft
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
          const { listEntry } = this.props;
          var checkedTimestamp = ""
  
          if (listEntry.getCheckedTs() !== null) {
            Date.prototype.addHours = function(h) {
                this.setTime(this.getTime() + (h*60*60*1000));
                return this;
              }  
            let checkedTs = new Date(listEntry.getCheckedTs()).addHours(2)
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
                      <TableCell padding="dense" align="left">{listEntry.article.getName()}</TableCell>
                      <TableCell padding="dense" align="left">{listEntry.retailer.getName()}</TableCell> 
                      <TableCell padding="dense" align="left">{listEntry.purchasingUser.getName()}</TableCell> 
                      <TableCell padding="dense" align="left">{checkedTimestamp}</TableCell> 
  
                  </TableRow>
                  
                  
              </React.Fragment>
          );
      }
  }

  class OneGroupStat extends Component {
      constructor(props) {
          super(props);
          this.state = {
              listEntryTableElements: [],
              filteredListEntryTableElements: [],
              openDialog: false,
              groupId : this.props.match.params.groupId,
              retailers: [],
              users: [],
              articleAmounts: [],
              filterInput: "",
              filteredElements: [],
              filterObject: "articleName",
              textField: "block",
              timeFilter: "none",
              filterArticleName: "",
              filterRetailerName: "",
              filterPurchasingUserName: "",
              filterChecked: true,
              filterStartDate: null,
              filterEndDate: null,
              filterOpen: "none",
              filterText: "Filter anzeigen"
          }
      }
  
      componentDidMount(){
          if(this.state.groupId){
              this.loadRetailers()
              this.loadArticleAmounts()
              this.loadListEntries().then(() => {
                  this.filterInput()
                })
                this.loadUsers()
            }
      }
  
      // dropdown selector for what fo filter
      filterInput = () => {
          const { filterArticleName,  filterRetailerName, filterPurchasingUserName, filterChecked, 
                  filterStartDate, filterEndDate, listEntryTableElements} = this.state
          
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
        this.setState({
            filteredListEntryTableElements: filteredElements
        })
    }

    openMenu = () => {
        this.setState({
            anchorEl: true
        })
    }
    
    loadListEntries = async () => {
        // get listentries by user ID
        const listEntries = await AppAPI.getAPI().getListEntriesIncludeArchivedByGroupId(this.state.groupId)
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

      loadArticleAmounts = () => {
        return AppAPI.getAPI().getArticlesFrequencyByGroupId(this.state.groupId).then((articles) => {
            var articleAmounts = articles.map((article) => <AmountEntry amountEntry={article} loadListEntries={this.loadListEntries} />)
            this.setState({
            articleAmounts: articleAmounts,
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
            this.handleSort()
          })          
      }
  
      clearStartDateInput = () => {
          this.setState({
              filterStartDate: null,
          })
          this.loadListEntries().then(() => {
            this.handleSort()
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
                name: "Einkäufer",
            },
            {
                name: "Kaufdatum",
            },
        ]
          const {retailers, users, filterArticleName, filterRetailerName, filterPurchasingUserName, filterChecked, filterStartDate, filterEndDate, filteredListEntryTableElements, articleAmounts, open} = this.state;
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
                    <Typography align="left" className="title" style={{fontSize: 16, color: colors.teal[600]}}><b>Gruppen Id:</b> {this.state.groupId}</Typography>
                </Grid>
                <Grid item xs={9} sm={6} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
                    <Typography align="right" className="title" style={{fontSize: 16}}>Häufigste Artikel</Typography>
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
                        {articleAmounts}
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
                <Grid item xs={12} sm={4}></Grid>
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
                      <Grid item xs={12} sm={12} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10}}>
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
                                  <TableCell align="left"><b style={{ color: '#ffffff'}}>Einkäufer</b></TableCell>
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
  
  
export default OneGroupStat;




