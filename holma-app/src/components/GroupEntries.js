import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
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
import ListEntry from './ListEntry'
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
        return ( 
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
            <CardActionArea>
            <CardMedia className="media" style={{height: 10, paddingTop: '56.25%',}} image={randomImages[Math.floor(Math.random() * randomImages.length)]} title="Groupname"/>
            <CardContent>
                <Typography className="title" style={{fontSize: 14}} color="textPrimary">{this.props.group.getName()}</Typography>
            </CardContent>
            </CardActionArea>     
            <CardActions>
                <Link to="/About">
                  <Button size="small">Anzeigen</Button>
                </Link>
            </CardActions>
         </Card>
    )
}}

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
      this.setState({
          openMember: true
      })    
    }

    handleCloseMember = () => {
      this.setState({
          openMember: false
      })
    }

    addGroup = () => { 
      const {user} = this.props;
      var grp = new GroupBO(this.state.groupName, user.getId());
      AppAPI.getAPI().createGroup(grp).then(group => {
        this.setState({groupId: group.getId()})
        console.log(this.state.groupId)
        AppAPI.getAPI().addUserToGroup(group.getId(), user.getId()).then( () => {
          this.loadGroups();
        })  
      })
      this.handleClose();
      this.handleClickOpenMember();//open new dialog
    }

    addMember() {
      //es muss gecheckt werden bei input ob der user existiert und ob er schon in der Gruppe ist,
      // checken ob user id vorhanden und ob user schon in group

      AppAPI.getAPI().addUserToGroup(this.state.groupId, this.state.memberId)
      this.setState({memberId: ""})
      this.loadMembers() //not working yet needs to be built properly
        //Member müssen geladen und gerendert werden
    }
    
    handleChangeMember = (e) => {
      this.setState({memberId: e.target.value})
    }

    loadMembers = () => { // getUsersByGroupId not working yet
      console.log("Hier sollen die Member der Gruppe " + this.state.groupId + " geladen werden")
      AppAPI.getAPI().getUsersByGroupId(this.state.groupId).then(users => {
        console.log("Loaded users from database for group '" + this.state.groupId + "'")
        console.log("Loaded users:", users)
        var memberElements = users.map((user) => 
          //wie kann die einzelne Gruppe im nächsten Schritt angesprochen werden?
          
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.getName()}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
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
      console.log("Hier", this.state.groupId)
      const {user} = this.props
        AppAPI.getAPI().getGroupsByUserId(user.getId()).then(groups => {
          console.log("Loaded groups from database for user '" + user.getName() + "'")
          console.log("Loaded groups:", groups)
          var groupElements = groups.map((group) => 
          //wie kann die einzelne Gruppe im nächsten Schritt angesprochen werden?
          <Grid key={group.getId()} item xs={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <GroupEntry key={group.getId()} group={group}/>
            </Paper>
          </Grid>
          )

          this.setState({
              GgroupElements: groupElements,
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
            handleChange={this.handleChangeMember}
            addMember={this.addMember}
            handleClickOpenMember={this.handleClickOpenMember}
            handleCloseMember={this.handleCloseMember}
            openMember={this.state.openMember}/>
            <ListEntry  />
            <ListEntry />
          </div>
        );
    }
}

export default GroupEntries;


