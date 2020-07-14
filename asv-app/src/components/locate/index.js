import React from "react"
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


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

const URL_POST_LOCATE = "http://localhost:5000/api/locate"


class LocateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: '' ,
            status: 'info',
            message: '',
            open:false
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
        fetch(URL_POST_LOCATE, requestOptions)           
            .then(function(response){
                that.setState({
                    message:"Locate",
                    open:true,
                    status:'success'
                });                
                
             })
            .catch(
                function(response){
                    that.setState({
                        message:"There was a problem in locate",
                        open:true,
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
                        id="locate"
                        label="Locate"
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

export default LocateForm;
