import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import PersonPin from '@material-ui/icons/PersonPin';
 
class Header extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  
  makeStyles = (theme) => ({
    root: {
      flexGrow: 1,
      width: '100%'
    },
    menuButton: {
      marginRight: theme.spacing(100, 'auto'),
    },
  })
  render() {
    const classes = this.makeStyles
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar >
          <Typography variant="h6" color="inherit">
              Holma
            </Typography>
            <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu">
              <ShoppingBasket />
            </IconButton>
            <IconButton edge="false" className={classes.menuButton} color="inherit" label="Login">
              <PersonPin />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default Header