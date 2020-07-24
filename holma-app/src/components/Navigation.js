import AppBar from "@material-ui/core/AppBar";
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AssessmentIcon from '@material-ui/icons/Assessment';
import GroupIcon from '@material-ui/icons/Group';
import InfoIcon from '@material-ui/icons/Info';
import PropTypes from "prop-types";
import React from "react";
import { Link as RouterLink, useHistory } from 'react-router-dom';


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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  Home: {
  }
}));

export default function ScrollableTabsButtonForce() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          font-size="48px"
        >
          <IconButton label="Back">
          <ArrowBackIosRoundedIcon onClick={() => history.goBack()}/>
          </IconButton>
          <Tab label="Gruppen" icon={<GroupIcon />} {...a11yProps(1)} component={RouterLink} to={`/groups`}/>
          <Tab label="Statistik" icon={<AssessmentIcon />} href="http://statistik.holma.xyz"/>
          <Tab label="Konto" icon={<AccountCircleIcon />} {...a11yProps(4)} component={RouterLink} to={`/user`}/>
          <Tab label="Info" icon={<InfoIcon />} {...a11yProps(1)} component={RouterLink} to={`/about`}/>
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
        Back
      </TabPanel>
      <TabPanel value={value} index={1}>
        Home
      </TabPanel>
      <TabPanel value={value} index={2}>
        Gruppen
      </TabPanel>
      <TabPanel value={value} index={3}>
        Statistik
      </TabPanel>
      <TabPanel value={value} index={4}>
        User
      </TabPanel>
    </div>
  );
}

