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


const randomIcons =[
  "https://cdn.businessinsider.de/wp-content/uploads/2020/03/Joggen-Fru%CC%88hling-600x400.jpg",

]



class GroupInformation extends Component {
    render() {
        return ( 
        <Grid container spacing ={1} style={{flexGrow: 1, }}>
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
            <CardActionArea >
            <CardContent>
                <Typography className="title" style={{fontSize: 14}} color="textPrimary">{this.props.group.getName()}</Typography>
            </CardContent>
            </CardActionArea>     
            <CardActions>
                <Button size="small">Ändern</Button>
            </CardActions>
         </Card>
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
          <CardActionArea>
          <CardContent>
              <Typography className="title" style={{fontSize: 14}} color="textPrimary">Gruppen-ID</Typography>
          </CardContent>
          </CardActionArea>     
          <CardActions>
              <Button size="small">Ändern</Button>
          </CardActions>
        </Card>
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
          <CardActionArea>
          <CardContent>  
              <Typography className="title" style={{fontSize: 14}} color="textPrimary">Creationdate</Typography>
          </CardContent>
          </CardActionArea>     
          <CardActions>
              <Button size="small">Ändern</Button>
          </CardActions>
        </Card>
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
          <CardActionArea>
          <CardContent>
              <Typography className="title" style={{fontSize: 14}} color="textPrimary">LastUpdate</Typography>
          </CardContent>
          </CardActionArea>     
          <CardActions>
              <Button size="small">Ändern</Button>
          </CardActions>
        </Card>
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
          <CardActionArea>
          <CardContent>
              <Typography className="title" style={{fontSize: 14}} color="textPrimary">Gruppenmitglieder</Typography>
          </CardContent>
          </CardActionArea>     
          <CardActions>
              <Button size="small">Ändern</Button>
          </CardActions>
        </Card>
        <Card className="root" style={{minWidth: 275, marginBottom:10, marginTop:10}}>
          <CardActionArea>
          <CardContent>
              <Typography className="title" style={{fontSize: 14}} color="textPrimary">Owner</Typography>
          </CardContent>
          </CardActionArea>     
          <CardActions>
              <Button size="small">Ändern</Button>
          </CardActions>
        </Card>
    </Grid>
        );
}}

class GroupEdit extends Component{
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
      const {user} = this.props
        AppAPI.getAPI().getGroupsByUserId(user.getId()).then(groups => {
          console.log("Loaded groups from database for user", user.getName())
          console.log("Groups:", groups)
          var elements = groups.map((group) => 
          <Grid key={group.getId()} item xs={4}>
            <Paper className="paper" style ={{ textAlign:'center',}} >
              <GroupInformation key={group.getId()} group={group}/>
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
          <ListWithBoxes elements={elements}/>
        );
    }
}
export default GroupEdit;


