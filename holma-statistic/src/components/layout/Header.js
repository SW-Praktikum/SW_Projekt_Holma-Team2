import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PersonPin from '@material-ui/icons/PersonPin';
import DropDown from '../dialogs/Dropdown';
import { Link as RouterLink } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { user, classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar >
            <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to={`/groups`}>
              <InsertChartIcon />
              <div>&nbsp;Holma-Statistics</div>
            </IconButton>
           <Typography style={{width: 960}} align="right">
            {
                user ?
                <>
                    <div user={user} style={{fontStyle: "italic"}}>
                      <div>User:&nbsp;{user.getName()} </div>
                      <div>ID:&nbsp;{user.getId()}</div> 
                    </div>
                </>
                :
                <>
                </>
            }
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: red
  },
  menuButton: {
    marginRight: theme.spacing(100, 'auto'),
    backgroundColor: red
  },
})


export default withStyles(styles)(Header);