import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import GroupBO from '../api/GroupBO';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import MemberAddDialog from '../components/dialogs/MemberAddDialog';
import ListWithBoxes from './ListWithBoxes'
import GroupAddDialog from './dialogs/GroupAddDialog';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import GroupEntries from './GroupEntries';
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
import SaveIcon from '@material-ui/icons/Save';




class GroupInformation extends Component {
  _handleClick = () => {
    this.props.addMember();
    this.props.loadMembers();
  };
  render(){
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
        <Typography  variant="h6" gutterBottom>
          Gruppenname:
        </Typography>
        <TextField
                  align='center'
                  onChange={this.props.handleChangeName}
                  margin="dense"
                  id="outlined-basic"
                  variant="standard"
                  type="text"
                  label={this.props.groupName}
                  minWidth='150'
                />
                <Button 
                startIcon={<SaveIcon />}
                 
                color="primary"
                onClick={this.props.handleClickSave}>
                </Button>
                
        </ListItem>    
      </Grid>
      
      <Grid item xs={6} sm={6}>
        <ListItem  align='center' style={{width:"auto"}}>
        <Typography  variant="h6" gutterBottom>
        Besitzer: {this.props.groupOwner}
        </Typography>
        </ListItem>
      </Grid>
      </Grid>
      
      <Box m={4}/>
      <Grid container spaching={1}>
      <Grid item xs={6} sm={6}>
        <ListItem align='center' style={{width:"auto"}}>
        <Typography  variant="h6" gutterBottom>
        Erstellt am: {this.props.groupCreationDate}
        </Typography>
        </ListItem>
      </Grid>
      <Grid item xs={6} sm={6}>
        <ListItem  align='center' style={{width:"auto"}}>
        <Typography  variant="h6" gutterBottom>
        Letzte Änderung: {this.props.groupLastUpdated}
        </Typography>
        </ListItem>
      </Grid>
      </Grid>

      <Box m={4} />
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
    </div>
    
  );
}}

class MemberDetails extends Component{
  constructor(props){
    super(props);
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
    }
  }

  componentDidMount(){
    if(this.props.match.params.groupId){
      this.getGroupDetails();
      this.loadMembers();
      console.log(this.props)
     }
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

  handleChangeName = (e) => {
    this.setState({
      groupName: e.target.value,
    })

  }

  handleClickSave = () => {
      AppAPI.getAPI().getGroupById(this.props.match.params.groupId).then (group => {
        group.setName(this.state.groupName)
        this.setState({
          groupObject: group
        })
        }).then (() => {
          AppAPI.getAPI().updateGroup(this.state.groupObject)
      })
  }

  getGroupDetails(){
    AppAPI.getAPI().getGroupById(this.state.groupId).then(group => {
      this.setState({
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

    render(){
      const {memberElements} = this.state;
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
            groupName={this.state.groupName}
            groupCreationDate={this.state.groupCreationDate}
            groupOwner={this.state.groupOwner}
            groupLastUpdated={this.state.groupLastUpdated} />
          <Box m={1}></Box>
          <ListWithBoxes groupElements={memberElements}/>
          <MemberAddDialog member={this.state.members} loadMembers={this.loadMembers}/> 
          </div>
      );
    }
}

export default MemberDetails;
