import React from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '5ch',
        },
    },
}));
const URL_POST_TRANSFER = "http://localhost:5000/api/transfer"


class TransferForm extends React.Component {
    
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
                    id="transfer"
                    label="Transfer"
                    type="number"
                    value={this.state.value}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />          
            <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={this.handleSubmit}>
                    <PlayCircleOutlineIcon />
                </IconButton>
            </label>
            </form>
       
      );
    }
}

export default TransferForm;
