import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class ArticleAddDialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            newArticleDialogValue: {
                name: '',
                value: ''
            }
        }
    }

    setNewArticleDialogValue = (e) => {
        this.setState({
            newArticleDialogValue: e
      })
    }

    handleClose = () => {
      this.props.setNewArticleDialogValue({
        name: '',
        value: ''
      });
      this.props.openArticleAddDialog(false);
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.props.setArticle({
        name: this.state.newArticleDialogValue.name,
        value: this.state.newArticleDialogValue.value,
      });
  
      this.handleClose();
    };
    

    render() {
        const { newArticleDialogValue } = this.state
        const { articleAddDialogOpen } = this.props;
        return (
            <Dialog open={articleAddDialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={this.handleSubmit}>
                <DialogTitle id="form-dialog-title">Neuen Artikel erstellen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Fehlt ein Artikel? Dann füg ihn hinzu!
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    value={newArticleDialogValue.name}
                    onChange={(event) => this.setNewArticleDialogValue({ ...newArticleDialogValue, name: event.target.value })}
                    label="name"
                    type="text"
                    />
                    <TextField
                    margin="dense"
                    id="name"
                    value={newArticleDialogValue.value}
                    onChange={(event) => this.setNewArticleDialogValue({ ...newArticleDialogValue, value: event.target.value })}
                    label="value"
                    type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button type="submit" color="primary">
                    Add
                    </Button>
                </DialogActions>
                </form>
            </Dialog>          
        );
    }
}


export default ArticleAddDialog;
