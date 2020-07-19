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
        this.state = {
            groupElements: [],
            loadingInProgress: false,
            loadingError: null,
            groupId: "",
            open: false,
            groupName: "",
            buttonDisabled: true,
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

    
    loadGroups = () => {
      const {user} = this.props
        AppAPI.getAPI().getGroupsByUserId(user.getId()).then(groups => {
          var groupElements = groups.map((group) => 
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
            
          </div>
        );
    }
}

export default GroupEntries;


