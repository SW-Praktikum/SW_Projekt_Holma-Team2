import { colors } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAPI from '../api/AppAPI';
import GroupBO from '../api/GroupBO';
import GroupAddDialog from './dialogs/GroupAddDialog';
import MemberAddDialog from './dialogs/MemberAddDialog';
import ListWithBoxes from './ListWithBoxes';

/**
 * When adding more member to a Group and then adding a new group emediateley, deleting meber Elements from state not working properly
 * 
 * also rendering on open dialog not working as it sould
 */


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    paper:{//neu
      textAlign: 'center',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    avatar: {
        backgroundColor: red,
      }, 
  });


const randomImages = [
  "https://portfolio.iuk.hdm-stuttgart.de/dk108/wp-content/uploads/sites/793/2020/07/1234-1.jpg"
]

class GroupEntry extends Component {
    render() {
        
        const path = "/grouplist/" + this.props.group.getId() + "/" + this.props.user.getId()
        return (
        <Link to={path} style={{textDecoration: 'none'}}>
          <Card className="root" style={{/* minHeight: 250 ,  */minWidth: '100%', marginBottom:10, marginTop:10, backgroundColor: colors.teal[600]}}>
            <CardActionArea>
            <CardMedia className="media" style={{height: 10, paddingTop: '56.25%',}} image={randomImages[Math.floor(Math.random() * randomImages.length)]} title="Groupname"/>
            <CardContent>
                <Typography className="title" style={{fontSize: 14, color: 'white'}}>{this.props.group.getName()}</Typography>
            </CardContent>
            </CardActionArea>
          </Card>
        </Link> 
    )
}
}


class GroupEntries extends Component{
    constructor(props) {
        super(props);
        this.addGroup = this.addGroup.bind(this)
        this.addMember = this.addMember.bind(this)
        this.state = {
            groupElements: [],
            memberElements: [],
            loadingInProgress: false,
            loadingError: null,
            groupId: "",
            open: false,
            openMember: false,
            groupName: "",
            memberId: "",
            buttonDisabled: true,
            minLength: 3
        }
    }

    nextPath(path) {
      this.props.history.push(path);
    }

    componentDidMount() {
      // load only if the owner object is given
      if (this.props.user) {
        this.loadGroups();
        
      }
    }

    handleChange = (e) => {
      let groupName = e.target.value
      let buttonDisabled = true
      if (groupName.length >= this.state.minLength) {
        buttonDisabled = false
      }
      this.setState({
        groupName: groupName,
        buttonDisabled: buttonDisabled
      })
      
    }

    handleClose = () => {
      this.setState({
          open: false
      })
    }

    handleClickOpen = () => {
      this.setState({
          open: true
      })    
    }

    handleClickOpenMember = () => {
      this.loadMembers().then(async () => {
        await this.setState({
            openMember: true
        });
      })
      
    }

    handleCloseMember = async () => {
      await this.setState({
        memberElements: [],
        openMember: false,
      })
    }

    addGroup = () => { 
      const {user} = this.props;
      var grp = new GroupBO(this.state.groupName, user.getId());
      AppAPI.getAPI().createGroup(grp).then(group => {
        this.setState({groupId: group.getId()})
        AppAPI.getAPI().addUserToGroup(group.getId(), user.getId()).then( () => {
          this.loadGroups();
          this.loadMembers();
        })  
      })
      this.handleClose();
      this.handleClickOpenMember();//open new dialog
    }
    addMember = async () => {
      // es muss gecheckt werden bei input ob der user existiert und ob er schon in der Gruppe ist,
      // checken ob user id vorhanden und ob user schon in group
      AppAPI.getAPI().addUserToGroup(this.state.groupId, this.state.memberId).then(async () => {
        await this.setState({memberId: ""})
        this.loadMembers()
      })
    }
    
    handleChangeMember = (e) => {
      this.setState({memberId: e.target.value}, () => {
        this.loadMembers()
      })
    }

    deleteUser = (userId) => {
      AppAPI.getAPI().deleteUsersFromGroup(this.state.groupId, userId).then(() => {
        this.loadMembers()
      })
      
      //this.setState({memberElements})
    }

    loadMembers = async () => {
      AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then(async (users) => {
        //console.log("Loaded users from database for group '" + this.state.groupId + "'")
        //console.log("Loaded users:", users)
        var memberElements = users.map((user) => 
              <ListItem key={user.getId()} item xs={4}>
                <ListItemAvatar>
                  <Avatar>
                    <FaceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.getName()}
                  secondary={"ID: " + user.getId()}
                />
                <ListItemSecondaryAction onClick={() => this.deleteUser(user.getId())}>
                  <IconButton >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          
          )
          await this.setState({
              memberElements: memberElements,
              loadingInProgress: true, // loading indicator 
              loadingError: null
            })
            return new Promise(function (resolve) { resolve(memberElements) })
          }).catch(e =>
              this.setState({ // Reset state with error from catch 
                loadingInProgress: false,
                loadingError: e
          })
        );  
      }

    loadGroups = () => {
      const {user} = this.props
        AppAPI.getAPI().getGroupsByUserId(user.getId()).then(groups => {
          //console.log("Loaded groups from database for user '" + user.getName() + "'")
          //console.log("Loaded groups:", groups)
          var groupElements = groups.map((group) => 
          //wie kann die einzelne Gruppe im nächsten Schritt angesprochen werden?
          <Grid key={group.getId()} item xs={6} item lg={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <GroupEntry key={group.getId()} user={user} group={group} setPath={this.setPath}/>
            </Paper>
          </Grid>
          )

          this.setState({
              groupElements: groupElements,
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
        const {groupElements, memberElements, groupName,buttonDisabled, minLength} = this.state;

        return (
          <div>
            <ListWithBoxes groupElements={groupElements}/>
            <GroupAddDialog 
            addGroup={this.addGroup} 
            open={this.state.open}
            groupName={groupName} 
            handleChange={this.handleChange} 
            handleClickOpen={this.handleClickOpen} 
            handleClose={this.handleClose} 
            user={this.props.user} 
            loadGroups={this.loadGroups}
            buttonDisabled={buttonDisabled}
            minLength={minLength}
            /> 
            <MemberAddDialog
            memberElements={memberElements}
            groupId={this.state.groupId} 
            memberId={this.state.memberId}
            handleChangeMember={this.handleChangeMember}
            addMember={this.addMember}
            handleCloseMember={this.handleCloseMember}
            openMember={this.state.openMember}/>
            
            
          </div>
        );
    }
}

export default GroupEntries;


