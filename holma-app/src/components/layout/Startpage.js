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
import { colors, Button, TextField, Checkbox } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntry: this.props.listEntry,
            checked: this.props.listEntry.getChecked()
        }
    }

    handleChangeCheck = (e) => {
      this.setState({
          checked: e.target.checked
      })
      this.state.listEntry.setChecked(e.target.checked)
      AppAPI.getAPI().updateListEntry(this.state.listEntry)
    }

    getGroupName = () => {
      console.log(this.props.listEntry.getShoppingListId())
      //AppAPI.getAPI().getRetailer
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
                            checked={this.state.checked}
                            onChange={this.handleChangeCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </TableCell>
                    <TableCell style={{paddingLeft: 5, paddingTop: 0, paddingBottom: 0, paddingRight: 10}} align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell padding="dense" align="left">{listEntry.getUnit()}</TableCell>
                    <TableCell padding="dense" align="left">{listEntry.getName()}</TableCell>
                    <TableCell padding="dense" align="left">{this.getGroupName()}</TableCell>
                    <TableCell padding="dense" align="right">{listEntry.getRetailerName()}</TableCell> 
                </TableRow>
                
                
            </div>
        );
    }
}

class Startpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableElements: [],
            userId : this.props.user.getId(),
        }
    }

    componentDidMount(){
        if(this.state.userId){
            this.loadListEntries();
          }
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
    
    render() {
        const {retailers} = this.state;
        return (
            <div display='flex'>            
              
              <Card style={{minWidth: '100%', marginBottom:15, marginTop:15, }}>
                <CardActionArea >
                <CardContent>
                    <Typography align="left" className="title" style={{fontSize: 16, fontWeight: "bold", color: colors.teal[600]}}>Deine persönliche Einkaufsliste</Typography>
                </CardContent>
                </CardActionArea>     
              </Card>

            <TableContainer component={Paper}>
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
                            <TableCell align="left"><b style={{ color: '#ffffff'}}>Gruppe</b></TableCell>
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
export default Startpage;