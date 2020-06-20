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
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Paper, Typography, Tabs, Tab, AppBar, CardActionArea }from '@material-ui/core';


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
      media: {
        height: 0,
        paddingTop: '56.25%',
        marginTop:'30'
      },
  });
  
    export default function OutlinedCard() {
        const classes = useStyles();

    return (
      <Card className={classes.root}>
          <CardActionArea>
          <CardMedia 
          className={classes.media}
          image="https://cdn.icon-icons.com/icons2/902/PNG/512/group_icon-icons.com_69369.png"
          title="Groupname"
          />
          <CardContent>
          <Typography className={classes.title} color="textSecondary">
                Groupname
            </Typography>
          </CardContent>
        </CardActionArea>     
        <CardActions>
          <Button size="small">Anzeigen</Button>
        </CardActions>
    </Card>
    );
}