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

const URL_POST_TRANSFER = "http://localhost:5000/api/locate"


class LocateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          value: event.target.value,
        });
      };

    handleSubmit(event) {
        event.preventDefault();
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("id", this.state.value);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
        };

        fetch(URL_POST_TRANSFER, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));        
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <TextField
                    onChange={this.handleChange}
                    id="locate"
                    label="Locate"
                    type="number"
                    value={this.state.value}
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
