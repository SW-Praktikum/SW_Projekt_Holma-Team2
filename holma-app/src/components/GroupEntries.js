import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListWithBoxes from './ListWithBoxes'
import ListEntryTable from './ListEntryTable'
import GroupAddDialog from './dialogs/GroupAddDialog';
import MemberAddDialog from './dialogs/MemberAddDialog';
import GroupBO from '../api/GroupBO';
import UserBO from '../api/UserBO';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import FaceIcon from '@material-ui/icons/Face';
import { colors } from '@material-ui/core';

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

class GroupEntry extends Component {
    render() {
        const path = "/grouplist/" + this.props.group.getId()
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
        }
    }

    nextPath(path) {
      console.log(path)
      this.props.history.push(path);
    }

    componentDidMount() {
      // load only if the owner object is given
      if (this.props.user) {
        this.loadGroups();
        
      }
    }

    handleChange = (e) => {
      this.setState({groupName: e.target.value})
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
      this.loadMembers()
      this.setState({
          openMember: true
      });
    }

    handleCloseMember = () => {
      this.setState({
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
        })  
      })
      this.handleClose();
      this.handleClickOpenMember();//open new dialog
    }

    addMember = () => {
      // es muss gecheckt werden bei input ob der user existiert und ob er schon in der Gruppe ist,
      // checken ob user id vorhanden und ob user schon in group
      AppAPI.getAPI().addUserToGroup(this.state.groupId, this.state.memberId).then(() => {
        this.loadMembers()
      })
      this.setState({memberId: ""})
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

    loadMembers = () => {
      AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then(users => {
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

    loadGroups = () => {
      const {user} = this.props
        AppAPI.getAPI().getGroupsByUserId(user.getId()).then(groups => {
          //console.log("Loaded groups from database for user '" + user.getName() + "'")
          //console.log("Loaded groups:", groups)
          var groupElements = groups.map((group) => 
          //wie kann die einzelne Gruppe im nächsten Schritt angesprochen werden?
          <Grid key={group.getId()} item xs={6} item lg={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <GroupEntry key={group.getId()} group={group} setPath={this.setPath}/>
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
        const {groupElements, memberElements} = this.state;

        return (
          <div>
            <ListWithBoxes groupElements={groupElements}/>
            <GroupAddDialog 
            addGroup={this.addGroup} 
            open={this.state.open}
            groupName={this.state.groupName} 
            handleChange={this.handleChange} 
            handleClickOpen={this.handleClickOpen} 
            handleClose={this.handleClose} 
            user={this.props.user} 
            loadGroups={this.loadGroups}/> 
            <MemberAddDialog
            memberElements={memberElements}
            groupId={this.state.groupId} 
            memberId={this.state.memberId}
            handleChangeMember={this.handleChangeMember}
            addMember={this.addMember}
            handleClickOpenMember={this.handleClickOpenMember}
            handleCloseMember={this.handleCloseMember}
            openMember={this.state.openMember}/>
            
            
          </div>
        );
    }
}

export default GroupEntries;


