import React from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      input: {
        display: 'none',
      },
}));
class LocateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="locate"
                    label="Locate"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span"  onClick={this.handleSubmit}>
                <PlayCircleOutlineIcon />
                </IconButton>
            </label>
            </form>
        );
    }
}

export default LocateForm;
