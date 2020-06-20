import React from 'react';
import {Paper, Typography, Tabs, Tab, AppBar }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';
import GroupAdd from '@material-ui/icons/GroupAdd';
import Assessment from '@material-ui/icons/Assessment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Settings from '@material-ui/icons/Settings';
//import theme from '../theme';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 1000,
  },
});
export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <Paper square className={classes.root}>
      <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="black"
        aria-label="icon label tabs example"
      >
        <Tab icon={<Group />} label="Gruppen" value="1"/>
        <Tab icon={<List />} label="Listen" value="2"/>        
      </Tabs>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="black"
        aria-label="icon label tabs example"
      >
        <Tab icon={<GroupAdd />} label="Gruppe hinzufügen" value="3" />
        <Tab icon={<Assessment />} label="Statistik" value="4" />
        
      </Tabs>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="red"
        aria-label="icon label tabs example"
      >
        <Tab icon={<AccountCircle />} label="Mein Konto" value="5" />
        <Tab icon={<Settings />} label="Settings" value="6" />
        
      </Tabs>
      </div>
    </Paper>
    </div>
  );
}