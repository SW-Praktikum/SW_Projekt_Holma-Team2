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
import { Link } from 'react-router-dom';
import GroupBO from '../api/GroupBO';

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

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


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

class Checkboxes extends React.Component {
  state = {
    checked: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          onChange={this.handleChange('checkedA')}
          value="checked"
        />
      </div>
    );
  }
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
            <TableCell style={{ width: '20%',}}><b>Add Shoppinglist</b></TableCell>
          <TextField id="standard-basic" label="name" style={{ width: '40%',}} />
            <TableCell style={{ width: '30%',}}>Add all Standardarticles</TableCell>
            <Checkboxes style={{ width: '10%',}}/>
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  );}
 


/* Hierbei wird man an die Component "GroupEdit" weitergeleitet*/
class Grouplink extends Component{
    render(){
        return(
            <Button variant="contained" color="primary" style={{width:'100%'}}>
                Gruppe bearbeiten
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
        this.state = {
            group: null,
            groupId: this.props.match.params.groupId,
            shoppingLists:[],
            shoppingListName: "",
            shoppingListMember: [],
            shoppingListNumberChecked: "",
            shoppingListNumberUncheked: "",
            shoppingListLastUpdated: "",
            memberId: "",
            ArticleName:"",
        }}
      
    componentDidMount(){
      if(this.props.match.params.groupId){
          this.loadShoppingLists();
        }
    }
    

    loadShoppingLists = () => {
      AppAPI.getAPI().getShoppingListsByGroupId(this.state.groupId).then(lists => {
        console.log("Loaded lists:", lists)
        console.log("Loaded lists:", this.state.groupId)
          this.setState({
              shoppingLists: lists,
              loadingInProgress: true, // loading indicator 
              loadingError: null
            })
            console.log("Loaded lists:", this.state.shoppingLists)
          }).catch(e =>
              this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
          })
        );  
      }
      

    render() {
            return(
            <div>
              <Box m={5} />
              <Link to={"/groupedit/" + this.props.match.params.groupId} style={{textDecoration: 'none'}}>
                <Grouplink/>
              </Link>
                <Box m={2} />
                <CollapsibleTable/>
                <Box m={2} />
                <AddShoppinglist/>
            </div>        
    );
}}

export default GroupList;