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

class GroupEntry extends Component {
    render() {
        return ( 
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
            <CardActionArea>
            <CardMedia className="media" style={{height: 10, paddingTop: '56.25%',}} image="https://cdn.icon-icons.com/icons2/902/PNG/512/group_icon-icons.com_69369.png" title="Groupname"/>
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
        this.state = {
            elements: [],
            loadingInProgress: false,
            loadingError: null,
        }
    }

    componentDidMount() {
      // load only if the owner object is given
      if (this.props.user) {
        this.loadGroups();
      }
    }
  
    loadGroups = () => {
        AppAPI.getAPI().getGroupsByUserId(this.props.user.getId()).then(groups => {
          console.log(groups)
          var elements = groups.map((group) => 
          <Grid key={group.getId()} item xs={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <GroupEntry key={group.getId()} group={group}/>
            </Paper>
          </Grid>
          )
          console.log(elements)
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
          <ListWithBoxes elements={elements}/>
        );
    }
}
export default GroupEntries;


