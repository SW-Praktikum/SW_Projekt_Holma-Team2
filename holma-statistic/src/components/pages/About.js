import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
}));

function About() {

  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography variant='h6'>
          Holma App
        </Typography>
        <br />
        <Typography>
          React Frontend written by Tim, Yassine, Dome, Jonas, Chris, Dennis
        </Typography>
        <br />
        <Typography variant='body2'>
          © Holma Projekt-Team
        </Typography>
      </div>
    </Paper>
  )
}

export default About;