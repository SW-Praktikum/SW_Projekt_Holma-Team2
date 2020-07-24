import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Es wird das Logo und der Name der Holma Statistik angezeigt.
 * 
 * Der Name und die ID des angemeldeten Benutzers werden dargestellt.
 * 
 * Der Header wird durchgehend angezeigt.
 */

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
            <IconButton edge="false" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to={`/user-statistics`}>
              <InsertChartIcon />
              <div>&nbsp;Holma Statistik</div>
            </IconButton>
           <Typography style={{width: 960}} align="right">
            {
                user ?
                <>
                    <div user={user} style={{fontStyle: "italic"}}>
                      <div>{user.getName()} </div>
                      <div>Id:&nbsp;{user.getId()}</div> 
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