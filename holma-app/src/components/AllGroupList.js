import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import {Paper, Typography, Tabs, Tab, AppBar }from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Group from '@material-ui/icons/Group';
import List from '@material-ui/icons/List';


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
});


const classes = useStyles();
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
    setValue(newValue);
  };

class AllGroupList extends Component {
    constructor(props){
        super(props);
        this.state = {
              groups: ['Dennis','Tim'],
            //loadingInProgress: false,
            //loadingError: null,
        };
    }


    /*loadGroups = () => {
        AppAPI.getAPI().getGroups().then(groups =>
            this.setState({
                groups: groups,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    loadingInProgress: false,
                    loadingError: e
                })
            );
        this.setState({
            loadingInProgress: true,
            loadingError: null
        });
    }*/

    
 
  render(){
    return (
      <div>
        <Paper square class Name = {classes.root}>
          <div>
            <Tabs
            value = {value}
            onChange = {handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="black"
            aria-label="icon label tabs example"
            >
              <Tab icon={<Group />} label="Gruppen" value="1"/>
              <Tab icon={<List />} label="Listen" value="2"/>   
            </Tabs>
          </div>
        </Paper>
      </div>
    );
  }
};

export default (AllGroupList);