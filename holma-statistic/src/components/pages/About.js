import { makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
    <Paper style={{paddingLeft: 20, paddingRight: 20, paddingTop: 20}} elevation={0} className={classes.root}>
      <div className={classes.content}>
        <Typography color="primary" variant='h6'>
          Holma App
        </Typography>
        <br />
        <Typography>
          Holma ist eine webbasierte ShoppingList-Anwendung die dir dabei hilft, deine anstehenden Einkäufe und Besorgungen zu managen.          
          <br />
          Holma wurde im Rahmen eines Semesterprojekts von Studierenden der Hochschule der Medien Stuttgart aus dem Studiengang Wirtschaftsinformatik konzipiert und erstellt.
        </Typography>
        <br />
        <br />
        <Typography>
          Umgesetzt von:
        <List>
          <ListItem button component="a" href="mailto:ck169@hdm-stuttgart.de">
            <ListItemText primary="Christian Kieser" secondary="ck169@hdm-stuttgart.de" />
          </ListItem>
          <ListItem button component="a" href="mailto:dl052@hdm-stuttgart.de">
            <ListItemText primary="Dennis Lassahn" secondary="dl052@hdm-stuttgart.de" />
          </ListItem>
          <ListItem button component="a" href="mailto:dk108@hdm-stuttgart.de">
            <ListItemText primary="Dominik Kieschkel" secondary="dk108@hdm-stuttgart.de" />
          </ListItem>
          <ListItem button component="a" href="mailto:jg133@hdm-stuttgart.de">
            <ListItemText primary="Jonas Götz" secondary="jg133@hdm-stuttgart.de" />
          </ListItem>
          <ListItem button component="a" href="mailto:tr090@hdm-stuttgart.de">
            <ListItemText primary="Tim Reibe" secondary="tr090@hdm-stuttgart.de" />
          </ListItem>
          <ListItem button component="a" href="mailto:yb022@hdm-stuttgart.de">
            <ListItemText primary="Yassine Boutarbouch" secondary="yb022@hdm-stuttgart.de" />
          </ListItem>
        </List>
               
        </Typography>
        <br />
        <br />
        <Typography variant='body2'>
          © Holma Projekt-Team
        </Typography>
        <br />
      </div>
    </Paper>
  )
}

export default About;