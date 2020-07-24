import { Button } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

/**
 * Sobald im System ein Error entsteht, wird diese ContextErrorMessage ausgegeben.
 * 
 * Dadurch weiß der Benutzer, welcher Fehler entstanden ist.
 */

class ContextErrorMessage extends Component {
    #defaultText = 'Das hätte nicht passieren sollen, entschuldige!';

    render() {
        const {error, contextErrorMsg, onReload } =this.props;

        return (
            (error !== null) ?
            <Alert severity ='error'>
                <div>
                    {this.#defaultText}
                </div>
            <AlertTitle>
                {contextErrorMsg}
            </AlertTitle>
                <div>
                    Error message (for debugging only) is:
                </div>
            <div>
                {error.message}
            </div>
            {
                onReload?
                <div>
                    <Button variant = 'contained' color='primary' startIcon={<AutorenewIcon />} onClick={onReload}>
                        Reload
                    </Button>
                </div>
                :null
            }
            </Alert>
            :null
        );
    }
}


ContextErrorMessage.propTypes ={
    error: PropTypes.object,
    contextErrorMsg: PropTypes.string,
    onReload: PropTypes.func
}
export default (ContextErrorMessage);