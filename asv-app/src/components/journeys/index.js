import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


function TableJourneys() {
    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Group Id', field: 'id' },
        { title: 'Size', field: 'people' },

    ]);

    const URL_GET_JOURNEYS = 'http://127.0.0.1:5000/api/journeys/'
    const URL_POST_JOURNEYS = 'http://127.0.0.1:5000/api/journeys/'

    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('')
    const [state, setState] = useState('info')

    useEffect(() => {
        fetch(URL_GET_JOURNEYS)
            .then(res => res.json())
            .then(json => setData(json));

    }, [])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    return (
        <div>
            <MaterialTable
                title="Journeys"
                columns={columns}
                data={data}
                options={{
                    paging: false,
                    search: false
                }}
                data={
                    data
                }
                components={{
                    Toolbar: props => (
                        <div>
                            <MTableToolbar {...props} />                           
                        </div>
                    ),
                }}
                editable={{
                    isDeleteHidden: rowData => true,
                    isEditHidden:rowData => true,
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                newData["id"] = parseInt(newData["id"] )
                                newData["people"] = parseInt(newData["people"] )
                                fetch(URL_POST_JOURNEYS, {
                                    method: 'POST',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(newData)
                                }).then(
                                    function(response){
                                       if (response.status == 200){
                                        setMessage("Jorneys was saved")
                                        setState('success')
                                        setOpen(true)
                                       }
                                       else{
                                        setMessage("There was a problem saving the data")
                                        setState('error')
                                        setOpen(true)
                                       }
                
                                      
                                    }
                                  )
                                    .catch(
                                        function(response){
                                            setMessage("There was a problem saving the data")
                                            setState('error')
                                            setOpen(true)
                                         }
                                    );

                                setData([...data, newData]);

                                resolve();
                            }, 1000)
                        }),

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                               

                                resolve()
                            }, 1000)
                        }),
                }}
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={state}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default TableJourneys;

