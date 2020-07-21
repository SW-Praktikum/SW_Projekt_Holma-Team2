import { colors } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import AppAPI from '../api/AppAPI';
import ListEntryEditDialog from './dialogs/ListEntryEditDialog';

// classes for styling need to be created

class ListEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openDialog: false,
            listEntry: this.props.listEntry,
            checked: this.props.listEntry.getChecked(),
            articles: this.props.articles
        }
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

    closeDialog = () => {
        this.setState({
            openDialog: false})
        }
    
    handleChangeCheck = (e) => {
        this.setState({
            checked: e.target.checked
        })
        this.state.listEntry.setChecked(e.target.checked)
        AppAPI.getAPI().updateListEntry(this.state.listEntry)
    }

    deleteEntry = (entry) => {
        AppAPI.getAPI().deleteListEntry(entry).then(() => {
            this.props.loadListEntries()
        })
    }

    render() {
        const { classes, groupId, users, retailers, listEntry } = this.props;
        const { open, articles } = this.state;
        var groupCreationDate = ""
        var groupLastUpdated = ""

        if (listEntry.getLastUpdated() !="") {
            let lud = new Date(listEntry.getLastUpdated())
            let luds = lud.toString()
            groupLastUpdated = luds.substring(4, 21)
          }

        return (
            <React.Fragment>
                <ListEntryEditDialog
                    listEntry={listEntry}
                    groupId={groupId}
                    users={users}
                    articles={articles}
                    retailers={retailers}
                    loadArticles={this.props.loadArticles}
                    open={this.state.openDialog}
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
                    updateListEntry={this.updateListEntry}
                />
                <TableRow >
                    <TableCell padding="checkbox" align="left" style={{backgroundColor:"#ffffff"}}>
                        <Checkbox
                            color="primary"
                            checked={listEntry.getChecked()}
                            onChange={this.handleChangeCheck}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </TableCell>
                    <TableCell style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 0}} align="right">{listEntry.getAmount()}</TableCell>
                    <TableCell align="left">{listEntry.getUnit()}</TableCell>
                    <TableCell padding="default" align="left">{listEntry.getArticleName()}</TableCell>
                    <TableCell padding="none" >
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell padding="none" align='right'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.openDialog()}>
                            <EditIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell style={{paddingLeft: 0, paddingTop: 0, paddingBottom: 0, paddingRight: 10}} align='center'>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.deleteEntry(listEntry)}>
                            <DeleteIcon/>
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: colors.grey[100]}} colSpan={10}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Table size="small" aria-label="purchases">
                                    <TableHead >
                                        <TableRow>
                                            <TableCell className={classes.tableCell} colSpan={3} padding="none" align="left">Einkäufer</TableCell>
                                            <TableCell className={classes.tableCell} colSpan={2} padding="none" align="left">Händler</TableCell>
                                            <TableCell className={classes.tableCell} colSpan={4} padding="none" align="left">Geändert</TableCell>
                                            <TableCell className={classes.tableCell} colSpan={1} padding="none" align="center">STD</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell className={classes.tableCell} colSpan={3} padding="none" align="left">{listEntry.getPurchasingUserName()}</TableCell>
                                        <TableCell className={classes.tableCell} colSpan={2} padding="none" align="left">{listEntry.getRetailerName()}</TableCell>
                                        <TableCell className={classes.tableCell} colSpan={4} padding="none" align="left">{groupLastUpdated}</TableCell>
                                        <TableCell className={classes.tableCell} colSpan={1} padding="none" align='center'>
                                            <IconButton disabled="true" aria-label="expand row" size="small" >
                                                {listEntry.isStandardarticle() ?  <StarIcon /> : <StarBorderIcon />}
                                            </IconButton>
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>    
                </TableRow>
        </React.Fragment>
        );
    }
}

const styles = theme => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
    },
    tableCell: {
        borderBottom: "none"
    }
})

export default withStyles(styles)(ListEntry);