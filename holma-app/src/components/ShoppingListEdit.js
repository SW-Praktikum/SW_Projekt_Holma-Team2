import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';

/**
 * ShoppingListEdit wird durch das Anklicken des 'Details' Button in der ListEntryTable aufgerufen.
 * 
 * 
 * Die Details der angesprochenen Shoppinglist werden hier angezeigt.
 * 
 * Der Listenname kann durch das Aufrufen von ShoppingListEditDialog geändert werden
 * 
 * 
 * Der Button 'Liste löschen' ermöglicht es, die Gruppe komplett aus der Datenbank zu löschen.
 * 
 * Der Button 'Liste archivieren' ermöglicht es, die Shoppinglist nicht mehr unter Grouplist anzuzeigen, aber nicht aus der DB zu löschen. Dadurch kann Shoppinglist weiterhin im Report-Client 'Holma Statistik' angezeigt werden.
 */

class ShoppingListNameEditDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
        }        
    }

    componentDidMount() {
      if (this.props.shoppingListName) {
        //console.log(this.props.shoppingListName)
      }}

    

      render() {
        
        
          return (
            <React.Fragment>
              <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-editEntry">Listenname bearbeiten</DialogTitle>
                <DialogContent>
                  <TextField
                      type="text"
                      onChange={this.props.handleChangeName}
                      margin="dense"
                      id="combo-article"
                      variant="standard"
                      label={this.props.shoppingListName}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary">
                    abbrechen
                  </Button>
                  <Button onClick={this.props.saveChanges} color="primary">
                    speichern
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
            );
      }
  }




class ShoppingListEdit extends Component {
    constructor(props) {
      super(props)
      this.handleChangeName = this.handleChangeName.bind(this)
      this.state= {
        shoppingListId: this.props.match.params.shoppingListId,
        shoppingListName: "",
        shoppingListCreationDate: "",
        shoppingListLastUpdated: "",
        shoppingListObject: null,
        open: false,
        openDialog: false,
      }
    }
    

    componentDidMount() {
        if (this.props) {
            AppAPI.getAPI().getShoppingListById(this.state.shoppingListId).then((shoppingList) => {
                this.setState({
                    shoppingListObject: shoppingList,
                    shoppingListName: shoppingList.getName(),
                })
                this.getDate(shoppingList)
            })
        }
    }

    getDate = (shoppingList) => {
        Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + (h*60*60*1000));
            return this;
          }
        let lup = Date.parse(shoppingList.lastUpdated)
        let lup_iso = new Date(lup).addHours(4).toUTCString()
        let lup_iso_str = (lup_iso.substring(0, 3) + lup_iso.substring(4, lup_iso.length - 7))
        let gcd = Date.parse(shoppingList.creationDate)
        let gcd_iso = new Date(gcd).addHours(4).toUTCString()
        let gcd_iso_str = (gcd_iso.substring(0, 3) + gcd_iso.substring(4, lup_iso.length - 7))
        this.setState({
            shoppingListCreationDate: gcd_iso_str,
            shoppingListLastUpdated: lup_iso_str
        })

    }

    handleChangeName = (e) => {
        this.state.shoppingListObject.name = e.target.value
        }
  
    saveChanges = () => {
        AppAPI.getAPI().updateShoppingList(this.state.shoppingListObject).then(()=>
        this.componentDidMount(),
        this.handleClose()
        )
    }

    handleDeleteShoppingList = () => {
        //console.log(this.state.shoppingListObject)
        AppAPI.getAPI().deleteShoppingList(this.state.shoppingListObject).then(() => 
        window.location.reload()
        );
    }

    handleDeleteShoppingList = () => {
        //console.log(this.state.shoppingListObject)
        AppAPI.getAPI().archiveShoppingList(this.state.shoppingListObject).then(() => 
        window.location.reload()
        );
    }

    setOpen(bool) {
        this.setState({
            open: bool
        })
    }

    openDialog = () => {
        this.setState({
            openDialog: true})
        }

    handleClose = () => {
        this.setState({
            openDialog: false})
        }


    render(){
        const {open, shoppingListName, shoppingListObject} = this.state;
        const { shoppingListId } = this.props
        
        return (
            <React.Fragment>
                <Paper style={{paddingTop: 15, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, marginTop: 15}} elevation={0}>

                    <Typography  variant="h4" gutterBottom>
                    Shoppinglistdetails:
                    </Typography>
                    
                    <Grid container spaching={3}>
                    <Grid item xs={12} sm={6} style={{paddingTop: 10, paddingBottom: 10,}}>
                        <Typography style={{fontWeight: "bold"}} gutterBottom>
                        Listenname: 
                        </Typography>
                        <Typography gutterBottom>
                        {this.state.shoppingListName}
                        <IconButton style={{paddingBottom: 10, paddingLeft: 10}} aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                            <EditIcon/>
                        </IconButton>
                            <ShoppingListNameEditDialog
                                openDialog={this.openDialog}
                                open={this.state.openDialog}
                                shoppingListObject={shoppingListObject}
                                handleClose={this.handleClose}
                                shoppingListId={shoppingListId}
                                shoppingListName={shoppingListName}
                                handleChangeName={this.handleChangeName}
                                saveChanges={this.saveChanges}
                                />
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} style={{paddingTop: 10, paddingBottom: 10,}}>
                        <Typography style={{fontWeight: "bold"}} gutterBottom>
                        Id: </Typography>
                        <Typography gutterBottom>
                        {this.state.shoppingListId}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{paddingTop: 10, paddingBottom: 10,}}>
                        <Typography style={{fontWeight: "bold"}} gutterBottom>
                        Erstellt am: 
                        </Typography>
                        <Typography gutterBottom>
                        {this.state.shoppingListCreationDate}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} style={{paddingTop: 10, paddingBottom: 10,}}>
                        <Typography style={{fontWeight: "bold"}} gutterBottom>
                        Letzte Änderung: 
                        </Typography>
                        <Typography gutterBottom>
                        {this.state.shoppingListLastUpdated}
                        </Typography>
                    </Grid>

                    </Grid>
                
                </Paper>

                <Box m={4} />
            
                <Grid container spaching={3}>
                    <Grid item xs={12} sm={4}>
                        <Button 
                            variant="contained"
                            fullWidth 
                            style={{marginBottom: 20, color: 'white',backgroundColor: '#D0021B'}} 
                            onClick={this.handleDeleteShoppingList}>
                            Liste archivieren
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Button 
                            variant="contained"
                            fullWidth 
                            style={{marginBottom: 20, color: '#D0021B'}} 
                            onClick={this.handleDeleteShoppingList}>
                            Liste löschen
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={8}></Grid>
                </Grid>
        </React.Fragment>

    );
    }}



    const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1)
    },
    content: {
        margin: theme.spacing(1),
    },
    button: {
        color: theme.palette.delete.main,
    }
    });

export default withStyles(styles)(ShoppingListEdit);