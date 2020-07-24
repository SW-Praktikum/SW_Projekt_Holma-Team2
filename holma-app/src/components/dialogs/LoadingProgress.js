import { LinearProgress, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class LoadingProgress extends Component {

  /** Renders the component */
  render() {
    const { classes, show } = this.props;

    return (
      show ?
        <div className={classes.root}>
          <LinearProgress color='primary' />
        </div>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  }
});

/** PropTypes */
LoadingProgress.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If true, the loading progress is rendered */
  show: PropTypes.bool.isRequired,
}

export default withStyles(styles)(LoadingProgress);
