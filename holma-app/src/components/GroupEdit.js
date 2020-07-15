import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import {withStyles} from '@material-ui/core';
import MemberAddDialog from '../components/dialogs/MemberAddDialog';
import GroupBO from '../api/GroupBO';
import ListWithBoxes from './ListWithBoxes'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';
import GroupNameEditDialog from '../components/dialogs/GroupNameEditDialog';





class GroupInformation extends Component {
  constructor(props) {
    super(props)
    this.state= {
      open: false,
      openDialog: false,
      groupObject: this.props.groupObject, 
    }
  }

  setOpen(bool) {
    this.setState({
        open: bool
    })
}

openDialog = () => {
    this.setState({
        openDialog: true})
    }

handleClose = () => {
    this.setState({
        openDialog: false})
    }

  _handleClick = () => {
    this.props.addMember();
    this.props.loadMembers();
  };
  render(){
    const {open} = this.state;
    const {groupName} = this.props;
    return (
    <div>
    <Grid style={{backgroundColor:'white'}}>
      <Box m={5} />
        <ListItem elevation={3} align='center' style={{width:"auto"}}>
        <Typography  variant="h4" gutterBottom>
          Gruppendetails
        </Typography>
      </ListItem>
      <Box m={5} />
      <Grid container spaching={1}>
        <Grid item xs={6} sm={6}>
        <ListItem align='center' style={{width:"auto"}}>
        <Typography  variant="h6" style={{fontWeight: "bold"}} gutterBottom>
          Gruppenname:   
        </Typography>
        <Typography  variant="h6" gutterBottom>
          {groupName}
        </Typography>
        <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
          <EditIcon/>
        </IconButton>
        <GroupNameEditDialog
          openDialog={this.openDialog}
          open={this.state.openDialog}
          handleClose={this.handleClose}
          groupObject={this.props.groupObject}
          groupId={this.props.groupId}
          groupName={groupName}
          getGroupDetails={this.props.getGroupDetails}
        />
        </ListItem>    
      </Grid>
      
      <Grid item xs={6} sm={6}>
        <ListItem  align='center' style={{width:"auto"}}>
        <Typography  variant="h6" style={{fontWeight: "bold"}} gutterBottom>
        Admin:
        </Typography>
        <Typography  variant="h6" gutterBottom>
        {this.props.groupOwner}
        </Typography>
        </ListItem>
      </Grid>
      </Grid>
      
      <Box m={4}/>
      
      <Grid container spaching={1}>
      <Grid item xs={6} sm={6}>
        <ListItem align='center' style={{width:"auto"}}>
        <Typography  variant="h6" style={{fontWeight: "bold"}} gutterBottom>
        Erstellt am:
        </Typography>
        <Typography  variant="h6" gutterBottom>
        {this.props.groupCreationDate}
        </Typography>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={6}>
        <ListItem  align='center' style={{width:"auto"}}>
        <Typography  variant="h6" style={{fontWeight: "bold"}} gutterBottom>
        Letzte Änderung:
        </Typography>
        <Typography  variant="h6" gutterBottom>
        {this.props.groupLastUpdated}
        </Typography>
        </ListItem>
      </Grid>
      </Grid>
      <Box m={4} />

      <Grid container spaching={1}>
      <Grid item xs={6} sm={6}>
      <ListItem elevation={3} align='center' style={{width:"auto"}}>
        <Typography  variant="h4" gutterBottom>
          Mitglieder
        </Typography>
      </ListItem>
      <Grid style={{marginLeft: 15, alignItems: 'center'}}>
      <TextField
          autoFocus
          onChange={this.props.handleChangeMember}
          margin="dense"
          id="outlined-basic"
          variant="outlined"
          label="Mitglieds ID"
          type="ID"
          value={this.props.memberId} 
          style={{width: 150, marginBottom: 15, marginRight: 15, alignItems: 'center'}}       
                />
      <Button 
          style={{marginTop: 9, marginBottom: 15, alignItems: 'center'}}
          onClick={this._handleClick}
          color="primary" 
          variant="contained"
          >
            hinzufügen
      </Button>
      </Grid>
    </Grid>

    <Grid style={{marginLeft: 15, alignItems: 'center'}}>
      <ListItem elevation={3} align='center' style={{width:"auto"}}>
              <Typography  variant="h4" gutterBottom>
                Artikel
              </Typography>
            </ListItem>
          <Grid style={{marginLeft: 15, alignItems: 'center'}}>
            <Link to={"/articleedit/" + this.props.groupId} style={{textDecoration: 'none'}}>
              <ArticleLink/>
            </Link>
            <Link to={"/standardarticleedit/" + this.props.groupId} style={{textDecoration: 'none'}}>
            <StandardArticleLink/>
            </Link>
          </Grid>
        </Grid>
    </Grid>
    </Grid>
    </div>
    
  );
}}

class ArticleLink extends Component{
  render(){
      return(
          <Button style={{marginTop: 9, marginBottom: 15, alignItems: 'center'}}
          color="primary" 
          variant="contained">
              Artikel anzeigen
          </Button>
      )
  }
}

class StandardArticleLink extends Component{
  render(){
      return(
          <Button style={{marginTop: 9, marginBottom: 15, marginLeft: 15, alignItems: 'center'}}
          color="primary" 
          variant="contained">
              Standardartikel
          </Button>
      )
  }
}

class MemberDetails extends Component{
  constructor(props){
    super(props);
    this.getGroupDetails = this.getGroupDetails.bind(this)
    this.addMember = this.addMember.bind(this)
    console.log("Props:", props)
    this.state ={
      memberElements: [],
      groupObject:"",
      groupId: this.props.match.params.groupId,
      groupName: "",
      groupCreationDate: "",
      groupOwner: "",
      groupLastUpdated: "",
      loadingInProgress: false,
      loadingError: null,
      memberId: "",
      open: false,
      openDialog: false,
    }
  }

  componentDidMount(){
    if(this.props.match.params.groupId){
      this.getGroupDetails();
      this.loadMembers();
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

  addMember() {
    AppAPI.getAPI().addUserToGroup(this.state.groupId, this.state.memberId)
    this.setState({memberId: ""}, () => {
      this.loadMembers();
    })
  }

  handleChangeMember = (e) => {
    this.setState({memberId: e.target.value})
  }

  getGroupDetails(){
    AppAPI.getAPI().getGroupById(this.state.groupId).then(group => {
      this.setState({
        groupObject: group,
        groupName: group.getName(),
        groupCreationDate: group.getCreationDate(),
        groupOwner: group.getOwner(),
        groupLastUpdated: group.getLastUpdated(),
      })
    })
  }
  
  removeUser = (userId) => {
    AppAPI.getAPI().deleteUsersFromGroup(this.state.groupId, userId).then(() => {
      this.loadMembers()
    })
  }

  loadMembers = () => {
    AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then(users => {
      var memberElements = users.map((user) => 
      <Grid  item xs={12} sm={6} md={4}>
      <Paper style ={{ textAlign:'center',}} >
      <List item xs={12} sm={6} md={4}>
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
      <ListItemText
        primary={user.getName()}
        secondary={"ID: " + user.getId()}
      />
        <ListItemSecondaryAction onClick={() => this.removeUser(user.getId())}>
           <IconButton >
              <DeleteIcon />
                </IconButton>
        </ListItemSecondaryAction>
        </ListItem>
        </List>
      </Paper>
       </Grid>
      )
        this.setState({
            memberElements: memberElements,
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

    handleDeleteGroup = () => {
      AppAPI.getAPI().deleteGroup(this.state.groupObject).then(() => 
        window.location.reload()
      );
    }

    render(){
      const {memberElements} = this.state;
      const {classes} = this.props;
      const {open} = this.state
      this.loadMembers = this.loadMembers.bind(this)
      return(
        <div>
          <GroupInformation
            handleChangeMember={this.handleChangeMember}
            handleClickSave={this.handleClickSave}
            handleChangeName={this.handleChangeName}
            memberId={this.state.memberId}
            addMember={this.addMember}
            loadMembers={this.loadMembers}
            group={this.state.groupDetail}
            groupId={this.state.groupId}
            groupName={this.state.groupName}
            groupCreationDate={this.state.groupCreationDate}
            groupOwner={this.state.groupOwner}
            groupLastUpdated={this.state.groupLastUpdated} 
            setOpen={this.setOpen}
            openDialog={this.openDialog}
            handleClose={this.handleClose}
            openDialog={this.openDialog}
            open={this.state.openDialog}
            handleClose={this.handleClose}
            handleInputChange={this.handleInputChange}
            groupObject={this.state.groupObject}
            getGroupDetails={this.getGroupDetails}
            />
          <Box m={1}></Box>
          <ListWithBoxes groupElements={memberElements}/>
          <MemberAddDialog members={memberElements} loadMembers={this.loadMembers}/> 
          <Box m={4} />
          <Button className={classes.button} variant="contained" style={{marginBottom: 20, color: 'white', backgroundColor: 'red'}} onClick={this.handleDeleteGroup}>Gruppe löschen</Button>
        </div>
      );
    }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  },
  button: {
    color: theme.palette.delete.main,
    
  }
});

export default withStyles(styles)(MemberDetails);
