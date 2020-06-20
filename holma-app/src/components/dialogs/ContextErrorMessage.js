import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import AutorenewIcon from '@material-ui/icons/Autorenew';

class ContextErrorMessage extends Component {
    #defaultText = 'Das hätte nicht passieren sollen, entschuldige!';

    render() {
        const { classes, error, contextErrorMsg, onReload } =this.props;

        return (
            (error !== null) ?
            <Alert severity='error' className={classes.root}>
                <div>
                    {this.#defaultText}
                </div>
                <AlertTitle>
                {contextErrorMsg}
                </AlertTitle>
                <div className={classes.margins}>
                    Die Fehlermeldung (for debugging only) lautet:
                </div>
                    <div>
                    {error.message}
                </div>
                    {
                onReload ?
                <div className={classes.margins}>
                <Button variant='contained' color='primary' startIcon={<AutorenewIcon />}onClick={onReload}>
                  Reload
            </Button>
              </div>
              : null
          }
           </Alert>
            : null
        );
    }
}

// const styles = theme => ({
//     margins: {
//       marginTop: theme.spacing(2)
//     }
//   });
//Component specific styles hab ich mal weggelassen

ContextErrorMessage.propTypes ={
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    contextErrorMsg: PropTypes.string,
    onReload: PropTypes.func
}
export default (ContextErrorMessage);