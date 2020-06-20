import React, { Component } from 'react'
import AppAPI from '../api/AppAPI';
import GroupBO from '../api/GroupBO';

class Box extends Component {
    render() {
        return ( <div className="kachel" style={{color: "red"}}>Group: {this.props.name} Owner: {this.props.owner}</div> )
    }
};


class ListWithBoxes extends Component{
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            loadingInProgress: false,
            loadingError: null
        }
    }

    componentDidMount() {
        this.loadGroups();
    }

    loadGroups = () => {
        AppAPI.getAPI().getGroupsByUserId("29").then(groups =>
        this.setState({
            groups: groups,
            loadingInProgress: true, // loading indicator 
            loadingError: null
          })).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e
            })
          );
    }

    render() {
        return (<div>
            {this.state.groups.map((group) => <Box key={group.getId()} name={group.getName()} owner={group.getOwner()}/>)}   
        </div>
        )
    }
}
export default ListWithBoxes;