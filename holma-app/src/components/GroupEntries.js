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
import GroupAddDialog from './dialogs/GroupAddDialog';


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
                <Button size="small"><Link to="/About" >Anzeigen</Link></Button>
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
            <GroupAddDialog user={this.props.user} loadGroups={this.loadGroups}/> 
          </div>
        );
    }
}
export default GroupEntries;


