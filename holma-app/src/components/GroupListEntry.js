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

class ListWithBoxes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            loadingInProgress: false,
            loadingError: null
        }
    }

    componentDidMount() {
        this.loadGroups();
    }

    loadGroups = () => {
        AppAPI.getAPI().getGroupsByUserId("29").then(groups =>
        this.setState({
            groups: groups,
            loadingInProgress: true, // loading indicator 
            loadingError: null
          })).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
        );
        console.log(this.state.groups)

    }

    render() {
        const {user} = this.props;
        return (            
        <div className="root" style={{flexGrow: 1,}}>
          <Grid container spacing ={1}>
            {this.state.groups.map((group) => 
              <Grid item xs={4}>
                <Paper className="paper" style ={{ textAlign:'center',}} >
                  <GroupEntry key={group.getId()} group={group}/>
                </Paper>
              </Grid>
            )}
          </Grid>
          {user ?
            <>
            <div>LOGGED IN: {user.displayName} </div>  
            </>
            :
            <>
            <div>NO USER LOGGED IN</div>
            </>
          }
        </div>
        );
    }
}
export default ListWithBoxes;


