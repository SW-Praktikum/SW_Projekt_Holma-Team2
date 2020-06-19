import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppAPI from '../../api/AppAPI';
import GroupBO from '../../api/GroupBO';


class GroupAddDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            group: null
    }}
    
    handleChange = (e) => this.setState({
		groupName: e.target.value
    })
    
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.addGroup1();
        };
    };
    _handleClick = () => {
        this.addGroup1();
    };
    
    addGroup = () => {
        console.log(this.state.groupName);
        console.log(this.state.group)

        //close Window
    }
    
    addGroup1 = () => {
        var grp = new GroupBO(this.state.groupName, 29);

        AppAPI.getAPI().createGroup(grp)
    }
        /*.getID().then(groupBO => {
            this.setState({
                groups: [...this.state.groups, groupBO],
                loadingInProgress:false,
                addingGroupError: null
            })
        })
        .catch(e =>
            this.setState({
                groups: [],
                loadingInProgress:false,
                addingGroupError: e
            })
        )
        )}*/
    
    render() {
        return (
            
            <React.Fragment>
                <div style={{color: "black"}}>Neue Gruppe erstellen</div>
                <TextField 
                onKeyDown={this._handleKeyDown} 
                value={this.state.groupName}
				onChange={this.handleChange}
                id="outlined-basic" label="Gruppenname" variant="outlined" />
                <Button onClick={this._handleClick} variant="contained" color="primary">Gruppe erstellen
                </Button>
            </React.Fragment>
        )
    }

}
export default(GroupAddDialog)

