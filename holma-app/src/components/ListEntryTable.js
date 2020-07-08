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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        console.log(this.props)

    }

    setOpen(bool) {
        this.setState({
            open: bool
        })
    }

    render() {
        const { row, listEntry } = this.props;
        const { open } = this.state
        return (
            <React.Fragment>
                <TableRow className="root">
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            History
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Total price ($)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {row.history.map((historyRow) => (
                                <TableRow key={historyRow.date}>
                                <TableCell component="th" scope="row">
                                    {historyRow.date}
                                </TableCell>
                                <TableCell>{historyRow.customerId}</TableCell>
                                <TableCell align="right">{historyRow.amount}</TableCell>
                                <TableCell align="right">
                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                </TableCell>
                                </TableRow>
                            ))}
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

class ListEntryTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEntryTableRows: []
        }
    }

    componentDidMount(){
        if(this.props.shoppingListId){
            this.loadListEntries();
            console.log(this.state)
          }
      }
      
  
      loadListEntries = () => {
        AppAPI.getAPI().getListEntriesByShoppingListId(this.props.shoppingListId).then(listEntries => {
            console.log("Loaded ListEntries:", listEntries)
            var listEntryTableRows = users.map((user) => <ListEntry user={user} />)
            this.setState({
                listEntryTableRows: listEntryTableRows,
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


    createData(name, calories, fat, carbs, protein, price) {
        return {
          name,
          calories,
          fat,
          carbs,
          protein,
          price,
          history: [
            { date: '2020-01-05', customerId: '11091700', amount: 3 },
            { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
          ],
        };
      }
    
    render() {
        const rows = [
            this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
            this.createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
            this.createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
            this.createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
            this.createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
          ];
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <ListEntry key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}


export default ListEntryTable;