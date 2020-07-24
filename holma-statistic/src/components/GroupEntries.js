import { colors } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppAPI from '../api/AppAPI';
import ListWithBoxes from './ListWithBoxes';


/**
 * Es werden alle Gruppen der Holma Statistik dargestellt.
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
        return (
          <Link to={'/OneGroupStat/' + this.props.group.getId()} style={{textDecoration: 'none'}}>
          <Card className="root" style={{minWidth: '100%', backgroundColor: colors.teal[600]}}>
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
          <div style={{marginTop: 15}}>
            <ListWithBoxes groupElements={groupElements}/>
            
          </div>
        );
    }
}

export default GroupEntries;


