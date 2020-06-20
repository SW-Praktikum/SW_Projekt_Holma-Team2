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

class GroupEntry extends Component {
    render() {
        return ( <a className="group-link" title={this.props.title}>{this.props.icon}</a> )
    }}


    //<GroupEntry title={nb.title} href={nb.icon}/>

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

    export default function OutlinedCard() {
        const classes = useStyles();

    return (
      <Card className={classes.root} variant="outlined">
          <CardHeader>
          <Typography className={classes.title} color="textSecondary">
            Groupname
        </Typography>
          </CardHeader>

        <CardContent>
          <Typography className={classes.pos} color="textSecondary">
            adjective
          </Typography>
          <CardMedia
              classname={classes.media}
              image="/holma-app/src/components/images/groupIcon.png"
              title="GroupIcon"/>
        </CardContent>

        <CardActions>
          <Button size="small">Anzeigen</Button>
        </CardActions>
    </Card>
    );
}