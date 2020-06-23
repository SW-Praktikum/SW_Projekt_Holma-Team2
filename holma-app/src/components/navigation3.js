import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GroupIcon from '@material-ui/icons/Group';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/List";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

//Navigation für Mobile

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    />
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`
  };
}
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
},
appBar: {
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
},
appBarShift: {
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen
  }),
  marginRight: drawerWidth
},
title: {
  flexGrow: 1
},
hide: {
  display: "none"
},
drawer: {
  width: drawerWidth,
  flexShrink: 0
},
drawerPaper: {
  width: drawerWidth
},
drawerHeader: {
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start"
},
content: {
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth
}
  
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" >
        <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
            
            </Typography>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
      <main>
      </main>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Gruppen", "Shopping Listen"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <GroupIcon /> : <ListIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
