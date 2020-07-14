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
    const URL_PUT_JOURNEYS = 'http://127.0.0.1:5000/api/journeys/'

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
                            <div style={{ padding: '0px 10px' }}>
                                <Button variant="contained" color="primary" onClick={() => {

                                    fetch(URL_PUT_JOURNEYS, {

                                        method: 'PUT',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(data)
                                    }).then(
                                        function(response){
                                           setMessage("Jorneys was saved")
                                           setState('success')
                                           setOpen(true)
                                        }
                                      )
                                        .catch(
                                            function(response){
                                                setMessage("There was a problem saving the data")
                                                setState('error')
                                                setOpen(true)
                                             }
                                        );




                                }}> Save </Button>
                                <Button variant="contained" color="Secondary" onClick={() => {
                                    fetch(URL_GET_JOURNEYS, {
                                        method: 'GET',
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },
                                    })
                                    .then(res => res.json())
                                    .then(function(json){
                                        setData(json)
                                        setMessage("The changes was discarted")
                                        setState('success')
                                        setOpen(true)
                                     })
                                    .catch(
                                        function(response){
                                            setMessage("There was a problem saving the data")
                                            setState('error')
                                            setOpen(true)
                                         }
                                    );

                                }}
                                > Restore </Button>
                            </div>
                        </div>
                    ),
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                setData([...data, newData]);

                                resolve();
                            }, 1000)
                        }),

                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

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

