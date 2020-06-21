import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import PersonPin from '@material-ui/icons/PersonPin';
import { red } from '@material-ui/core/colors';
import DropDown from '../dialogs/Dropdown'
 

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
            <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu">
              <ShoppingBasket />
            </IconButton>
            <IconButton edge="false" className={classes.menuButton} color="inherit" label="Login">
              <PersonPin />
            </IconButton>
            <DropDown user={user} />
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