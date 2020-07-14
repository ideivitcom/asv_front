import React from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


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
        this.state = {
            value: '',
            status: 'info',
            message: '',
            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            open: false,
        });
    };

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
        var that = this
        fetch(URL_POST_TRANSFER, requestOptions)
            .then(function (response) {
                that.setState({
                    message: "The transfer has been a success",
                    open: true,
                    status:'success'
                });

            })
            .catch(
                function (response) {
                    that.setState({
                        message: "There was a problem in the transfer",
                        open: true,
                        status:'error'
                    });

                }
            );
    }



    render() {
        return (
            <div>
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
                <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.status}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </div>

        );
    }
}

export default TransferForm;
