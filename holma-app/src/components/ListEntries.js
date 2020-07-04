import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import { Collapse } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StarIcon from '@material-ui/icons/Star';
import AddBoxIcon from '@material-ui/icons/AddBox';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { colors } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AppAPI from '../api/AppAPI';
import ListEntryBO from '../api/ListEntryBO';
import ArticleBO from '../api/ArticleBO';

//highly experimental -> needs to be rewritten

class ListEntries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            open: false,
            amount: "",
            article: "",
            articleId: "",
            standard: false,
            groupId: 1000,
        }
  };    
        addListEntry = () => {
            // check if article already exists
            var artl = new ArticleBO(this.state.article, this.state.groupId);
            this.setState({articleId: artl.getId()})
            var etry = new ListEntryBO(this.state.articleId, this.state.amount, this.state.unit, 33, 34, this.state.checked, "Time", this.state.standard)
            console.log(etry)
        }
        



        addMember() {
            AppAPI.getAPI().addUserToGroup(this.state.groupId, this.state.memberId)
            this.setState({memberId: ""})
            this.loadMembers()
          }
        
        setOpen = () => {
            if (this.state.open === false)
                this.setState({open: true})
            else
                this.setState({open: false})
        }

        setStandard = () => { //not working yet
            if(this.state.standard === false)
                this.setState({standard: true})
                //add as Standard article
            else
                this.setStandard({standard: false})
                //remove from standard
        }   

        handleChangeCheck = (e) => {
            this.setState({checked: e.target.checked})
        }

        handleChangeAmount = (e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({amount: e.target.value})
            }
        }

        handleChangeArticle = (e) => {
            this.setState({article: e.target.value})
        }

    render() {
        const units = [
            {
              value: 'Stück',
              label: 'st',
            },
            {
              value: 'Gramm',
              label: 'g',
            },
            {
              value: 'Milligramm',
              label: 'mg',
            },
            {
              value: 'Kilogramm',
              label: 'kg',
            },
            {
              value: 'Milliliter',
              label: 'ml',
            },
            {
              value: 'Liter',
              label: 'l',
            },
          ];
          const retailer = [
              {
                  value: 'Edeka',
              },
              {
                value: 'Rewe',
              },
              {
                value: 'Netto',
                },            
                {
                value: 'Penny',
                },
                {
                value: 'Lidl',
                },
                {
                value: 'Kaufland',
                },
                {
                value: 'Aldi',
                },
                {
                value: 'Real',
                },
                {
                value: 'Metro',
                },
                {
                value: 'dm',
                },
                {
                value: 'Rossmann',
                },
                {
                value: 'Norma',
                },
                {
                value: 'Müller',
                },
                {
                value: 'Tegut',
                },
                {
                value: 'Alnatura',
                },
                {
                value: 'Denn\'s',
                },
                {
                value: 'Wochenmarkt',
                },
                {
                value: 'Bauernladen',
                },
                {
                value: 'Metzger',
                },
                {
                value: 'Bäcker',
                },
                {
                value: 'Sonstige',
                },
                {
                    value: 'Naturgut'

              }
          ]
          const user = [{value : "Herbert"}]
          const lastUpdated ="22-06-20-14:45"
        return (
            <React.Fragment>
            <TableContainer >
                <Table >
                <TableRow bgcolor={colors.lime[200]}>
                <TableCell padding="checkbox">
                    <Checkbox
                        checked={this.state.checked}
                        onChange={this.handleChangeCheck}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </TableCell>

                <TableCell align='center'>
                    <TextField
                        type="number"
                        value={this.state.amount}
                        onChange={this.handleChangeAmount}
                        margin="dense"
                        id="outlined-basic"
                        variant="standard"
                        label="Menge"
                        style={{ width: 60 }}
                    />
                </TableCell>

                <TableCell align='center' component='th' scope='row'>
                    <Autocomplete
                        id="combo-box-demo"
                        options={units}
                        getOptionLabel={(option) => option.value}
                        style={{ width: 140 }}
                        renderInput={(params) => <TextField {...params} label="Einheit" variant="standard" />}
                    />
                </TableCell>

                <TableCell align='center'>
                    <TextField
                        type="text"
                        onChange={this.handleChangeArticle}
                        margin="dense"
                        id="outlined-basic"
                        variant="standard"
                        label="Artikel"
                        style={{ width: 140 }}
                    />
                </TableCell>
                
                <TableCell align='right'>
                    <IconButton aria-label="expand row" size="small" onClick={() => this.setStandard(this.state.standard)}>
                        {this.state.standard ?  <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                </TableCell>

                <TableCell align='right'>
                <Button
                    variant="outlined" 
                    color="primary"
                    startIcon={<AddBoxIcon />} 
                    onClick={this.addListEntry}
                >
                Eintrag hinzufügen
              </Button>
                </TableCell>

                <TableCell align='right'>
                    <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(this.state.open)}>
                        {this.state.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                </TableRow >
                </Table>
                <Collapse in={this.state.open}>
                    <Table>
                    <TableRow bgcolor={colors.lime[100]}>
                    <TableCell align='left'>
                        <Autocomplete
                            id="combo-box-demo"
                            options={user}
                            getOptionLabel={(option) => option.value}
                            style={{ width: 140 }}
                            renderInput={(params) => <TextField {...params} label="Einkäufer" variant="standard" />}
                        />
                    </TableCell>
                    
                    <TableCell align='left'>
                        <Autocomplete
                            id="combo-box-demo"
                            options={retailer}
                            getOptionLabel={(option) => option.value}
                            style={{ width: 140 }}
                            renderInput={(params) => <TextField {...params} label="Einzelhändler" variant="standard" />}
                        />
                    </TableCell>

                    <TableCell align='left'>
                        <b>geändert: </b>{lastUpdated}
                    </TableCell>

                    </TableRow>
                    </Table>
                </Collapse>
                
            </TableContainer>
            </React.Fragment>
  );
}}

export default ListEntries;