import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';





const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
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
    }

    render() {
        return (<div>
            {this.state.groups.map((group) => <GroupEntry key={group.getId()} group={group}/>)}   
        </div>
        )
    }
}
export default ListWithBoxes;
