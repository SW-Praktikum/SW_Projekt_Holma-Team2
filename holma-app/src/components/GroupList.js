import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



class EditButton extends Component{
    render(){
        return(
            <Fab size="small" color="secondary" aria-label="edit">
                <EditIcon />
            </ Fab>
        )
    }
}


/*{this.props.group.getName()}*/
class Grouplink extends Component{
    render(){
        return(
            <Button variant="contained" color="primary" style={{width:'80%',}}>
                 Gruppendetails bearbeiten
            </Button>
        )
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  
  function ShoppingListBox() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <div className={classes.root} style={{width:'80%',}}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
                <Typography className={classes.heading}><Button variant="contained" color="primary">
                 ShoppingList 1
            </Button></Typography>
                <Typography className={classes.secondaryHeading}>4/10 bereits  erledigt</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Platz für den neusten Eintrag
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography>
              Platz für die letzte Änderung
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>ShoppingList 2</Typography>
            <Typography className={classes.secondaryHeading}>
              2/20 bereits erledigt
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Platz für den neusten Eintrag
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography>
              Platz für die letzte Änderung
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>ShoppingList 3</Typography>
            <Typography className={classes.secondaryHeading}>
              12/48 bereits erledigt
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Platz für den neusten Eintrag
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography>
              Platz für die letzte Änderung
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

        




class GroupList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            loadingInProgress: false,
            loadingError: null
        }}
    
    loadGroup = () => {
        AppAPI.getAPI().getGroupById(this.props.group.getId()).then(res =>
            this.setState({
                group:res,
                loadingInProgress: false,
                loadingError: null
            })).catch(e =>
                this.setState({
                    loadingInProgress: false,
                    loadingError: e
                })
                );
    }



    render() {
        /*const {group} = this.props;
        return ( 
            <div>
                {group ?
                <>
                {this.loadGroup()}
                <Grouplink/>
                </>
                :
                <>
                <div>NOPE</div>
                </>
                }
            </div>,
            <div>
                <EditButton/>
                <ShoppingListBox/>
            </div>*/
            return(

            <div>
                <Grouplink/>
                <EditButton/>
                <ShoppingListBox/>
            </div>        
        
    );
}}

export default GroupList;


