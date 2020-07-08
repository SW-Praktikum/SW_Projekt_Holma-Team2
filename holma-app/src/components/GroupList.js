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
import ListWithBoxes from './ListWithBoxes';
import GroupEntry from './GroupEntries';
import { colors } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';



class AddShoppinglist extends Component {
  render(){
  return (
    <TableContainer component={Paper} style={{ width: '100%',}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '20%',}}><b>Add Shoppinglist</b></TableCell>
          <TextField id="standard-basic" label="name" style={{ width: '40%',}} />
            <TableCell style={{ width: '30%',}}>Add all Standardarticles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  )
  }
}

class Grouplink extends Component{
  render(){
      return(
          <Button variant="contained" color="primary" style={{width:'100%'}}>
              Gruppe bearbeiten
          </Button>
      )
  }
}


const randomImages = [
  "https://www.bahn-tickets.com/wp-content/uploads/2016/07/Gruppenreise_Personen-1000x683px.jpg",
  "https://www.br.de/telekolleg/faecher/psychologie/gruppe-kreis-maenner100~_v-img__16__9__xl_-d31c35f8186ebeb80b0cd843a7c267a0e0c81647.jpg?version=c8dde",
  "https://www.verenathiem.com/wp-content/uploads/2016/01/Blog_pic_650_380_machtdergruppe.png",
  "https://teamworks-gmbh.de/wp-content/uploads/2015/02/gruppedummFotolia_72297488_XS_copyright.jpg",
  "https://s3-eu-central-1.amazonaws.com/vodafone-featured/wp-content/uploads/2019/01/18104102/erstelleeinesnapchatgruppemitdeinenfreunden-640x360.jpg",
  "https://www.schule-bw.de/faecher-und-schularten/gesellschaftswissenschaftliche-und-philosophische-faecher/gemeinschaftskunde/materialien-und-medien/soziologie/zusammenleben-soziale-gruppen/gruppe.jpg",
  "https://www.schulbilder.org/bild-in-der-gruppe-sprechen-dl14849.jpg",
  "https://blog.pasch-net.de/klick/uploads/Sport5.PNG",
  "https://cdn.businessinsider.de/wp-content/uploads/2020/03/Joggen-Fru%CC%88hling-600x400.jpg"
]

class ListCard extends Component {
  render() {
      return (
        <Card className="root" style={{/* minHeight: 250 ,  */minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: colors.teal[600]}}>
          <CardActionArea>
          <CardMedia className="media" style={{height: 10, paddingTop: '56.25%',}} image={randomImages[Math.floor(Math.random() * randomImages.length)]} title="Shoppinglist"/>
          <CardContent>
              <Typography className="title" style={{fontSize: 14, color: 'white'}}>{this.props.list.getName()}{this.props.list.getId()}</Typography>
          </CardContent>
          </CardActionArea>     
        </Card>
  )
}
}

class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            groupId: this.props.match.params.groupId,
            listElements:[],
            shoppingListName: "",
        }}
      
    componentDidMount(){
      if(this.props.match.params.groupId){
          this.loadShoppingLists();
        }
    }
    
    loadShoppingLists = () => {
      AppAPI.getAPI().getShoppingListsByGroupId(this.props.match.params.groupId).then((lists) => {
        console.log(lists)
        var listElements = lists.map((list) =>
        <Grid key={list.getId()} item xs={6} item lg={4}>
        <Paper className="paper" style ={{ textAlign:'center',}} >
          <ListCard key={list.getId()} list={list}/>
        </Paper>
      </Grid>
      )
            this.setState({
              listElements: listElements,
              loadingInProgress: true, // loading indicator 
              loadingError: null,
            });
            console.log("Save in state", listElements)
          }).catch(e =>
              this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
          })
        );  
      } 

    render() {
      const {listElements} = this.state;
      console.log("elements", listElements)
          return(
            <div>
              <Box m={5} />
              <Link to={"/groupedit/" + this.props.match.params.groupId} style={{textDecoration: 'none'}}>
                <Grouplink/>
              </Link>
                <Box m={2} />
                <AddShoppinglist/>
                <ListWithBoxes groupElements={listElements}/>
            </div>        
    );
}}

export default GroupList;