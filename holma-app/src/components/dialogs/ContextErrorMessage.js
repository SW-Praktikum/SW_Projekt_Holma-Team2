import React, {Component} from 'react';
import PropTypes from 'prop-types';
//Hier müssen verschiedene Elemente von Material-UI importiert werden

class ContextErrorMessage extends Component {
    #defaultText = 'Das hätte nicht passieren sollen, entschuldige!';

    render() {
        const { classes, error, contextErrorMsg, onReload } =this.props;

        return (
            (error !== null) ?
                <div>
                    {this.#defaultText}
                </div>
                <div className={classes.margins}>
                    Die Fehlermeldung lautet: {error.message} 
                </div>
        );
    }
}

//Component specific styles hab ich mal weggelassen

ContextErrorMessage.propTypes ={
    classes: PropTypes.object.isRequired,
    error: PropTypes.object,
    contextErrorMsg: PropTypes.string,
    onReload: PropTypes.func
}
export default (ContextErrorMessage);