import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Grid } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
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
          <Typography variant="h6" color="inherit">
            </Typography>
            <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to={`/groups`}>
              <ShoppingBasket />  
              <div>&nbsp;Holma</div>
            </IconButton>
            <Grid justify="space-between" container spacing={24}></Grid>
            <div user={user} style={{fontStyle: "italic"}}>
              <b>User:&nbsp;DominikK.</b>
              <br/>
              <b>ID:&nbsp;1023</b> 
            </div>
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