import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';

import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(shoppinglist, member, status, edit) {
  return {
    shoppinglist,
    member,
    status,
    edit,
    history: [//kann erst mit Logik hinterlegt werden, wenn die ListEntrys stehen
      { date: '2020-01-05', memberId: '30', article: "Apfel" },
      { date: '2020-20-05', memberId: '29', article: "Birne" },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.shoppinglist}</TableCell>
        <TableCell align="right">{row.member}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.edit}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Member</b></TableCell>
                    <TableCell><b>Article</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.memberId}</TableCell>
                      <TableCell>{historyRow.article}</TableCell>
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

Row.propTypes = {
  row: PropTypes.shape({
    shoppinglist: PropTypes.string.isRequired,
    member: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Fahrradfreunde', 8, "7/12", <EditButton/>),
  createData('Vortrinken', 2, "12/12", <EditButton/>),
  createData('Familie-Maier', 6, "2/3", <EditButton/>),
];

function EditButton(){
  return(
      <Fab size="small" color="secondary" aria-label="edit">
          <EditIcon />
      </ Fab>
  )
}

function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>Shoppinglist</b></TableCell>
            <TableCell align="right"><b>Member</b></TableCell>
            <TableCell align="right"><b>Status</b></TableCell>
            <TableCell align="right"><b>Edit</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function AddShoppinglist() {
  return (
    <TableContainer component={Paper} style={{ width: '100%',}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell><b>Add Shoppinglist</b></TableCell>
            <TableCell><form noValidate autoComplete="off">
          <TextField id="standard-basic" label="name" style={{ width: '50%',}}/>
              </form>
            </TableCell>
            <TableCell><form noValidate autoComplete="off">
          <TextField id="standard-basic" label="standardarticle_id" style={{ width: '50%',}}/>
        </form>
        </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      
        </TableBody>
      </Table>
    </TableContainer>
  );}
  

/*{this.props.group.getName()}*/
/* Hierbei wird man an die Component "GroupEdit" weitergeleitet*/
class Grouplink extends Component{
    render(){
        return(
            <Button variant="contained" color="primary" style={{width:'100%',}}>
                 Edit Group
            </Button>
        )
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  

class GroupList extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.groupId)
        this.state = {
            group: null,
            loadingInProgress: false,
            loadingError: null
        }}
      
    componentDidMount(){
      if(this.props.match.params.groupId){
          this.loadShoppingLists();
        }
    }
    
    loadGroup = () => {
        AppAPI.getAPI().getGroupById(this.props.match.params.groupId).then((group) =>
            this.setState({
                group: group,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    loadingInProgress: false,
                    loadingError: e
                })
                );
    }

    loadShoppingLists = () => {
      AppAPI.getAPI().getShoppingListsByGroupId(this.props.match.params.groupId).then((shoppingLists) => {
        var shoppingListElements = shoppingLists.map((shoppingList) => 
            console.log(shoppingList.getName())
        );

      this.setState({
        shoppingListElements: shoppingListElements,
        loadingInProgress: true,
        loadingError: null
      })
    }).catch(e =>
      this.setState({
        loadingInProgress: false,
        loadingError: e
      })
    );
  }

    render() {
        /*const {group} = this.props;
        return ( 
            <div>
                {group ?
                <>
                {this.loadGroup()}
                <Grouplink/>
                </>
                :
                <>
                <div>NOPE</div>
                </>
                }
            </div>,
            <div>
                <EditButton/>
                <ShoppingListBox/>
            </div>*/
            return(

            <div>
              <Box m={5} />
                <Grouplink/>
                <Box m={2} />
                <CollapsibleTable/>
                <Box m={2} />
                <AddShoppinglist/>
            </div>        
        
    );
}}

export default GroupList;


