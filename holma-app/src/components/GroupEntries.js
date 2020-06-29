import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
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
                <Button size="small">Anzeigen</Button>
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
            elements: [],
            loadingInProgress: false,
            loadingError: null,
            groupId: "",
            open: false,
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
    }

    addMember() {
      //es muss gecheckt werden bei input ob der user existiert und ob er schon in der Gruppe ist,
      //it input form validation
      console.log(AppAPI.getAPI().getUsersByGroupId(12))
      //console.log(AppAPI.getAPI().getGroupById(12))
      console.log("Hier neuer Meber")
      console.log(this.state.memberId)
      console.log(this.state.groupId)
      AppAPI.getAPI().addUserToGroup(this.groupId, this.state.memberId)
        console.log("done")
        //this.props.loadMembers();
      //this.handleClose()
    }
    
    handleChangeMember = (e) => {
      this.setState({memberId: e.target.value})
    }

    loadGroups = () => {
      console.log("Hier", this.props.groupId)
      const {user} = this.props
        AppAPI.getAPI().getGroupsByUserId(user.getId()).then(groups => {
          console.log("Loaded groups from database for user '" + user.getName() + "'")
          console.log("Loaded groups:", groups)
          var elements = groups.map((group) => 
          <Grid key={group.getId()} item xs={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <GroupEntry key={group.getId()} group={group}/>
            </Paper>
          </Grid>
          )

          this.setState({
              elements: elements,
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
        const {elements} = this.state;
        return (
          <div>
            <ListWithBoxes elements={elements}/>
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
            groupId={this.state.groupId} 
            memberId={this.state.mamberId}
            handleChange={this.handleChangeMember}
            addMember={this.addMember}/>
            <ListEntry  />
            <ListEntry />
          </div>
        );
    }
}

export default GroupEntries;


