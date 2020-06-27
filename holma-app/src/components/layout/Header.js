import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { red } from '@material-ui/core/colors';
import DropDown from '../dialogs/Dropdown';
import Tabs from '@material-ui/core/Tabs';
 

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabindex: 0
    };
  }
  
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  render() {
    const { user, classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
        <DropDown user={user} />
          <Toolbar >
          <Typography variant="h6" color="inherit">
            holma
            </Typography>
            <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu">
              <ShoppingBasket />
            </IconButton>
            
            {
            user ?
              <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
              </Tabs>
              : null
            }
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