import React, { useEffect } from "react";
import MaterialTable, { MTableToolbar } from 'material-table';
import 'whatwg-fetch';
import Button from '@material-ui/core/Button';



function TableJourneys() {
    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Group Id', field: 'id' },
        { title: 'Size', field: 'people' },

    ]);

    const URL_GET_JOURNEYS = 'http://127.0.0.1:5000/api/journeys/'
    const URL_PUT_JOURNEYS = 'http://127.0.0.1:5000/api/journeys/'

    const [data, setData] = useState([]);
    

    useEffect(() => {
        fetch(URL_GET_JOURNEYS)
            .then(res => res.json())
            .then(json => setData(json));

    }, [])

     
    return (
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
                            <Button variant="contained" color="primary"onClick={() =>
                            {                            

                                fetch(URL_PUT_JOURNEYS, {                                    
                                  
                                    method:'PUT',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'                                    
                                    },
                                    body: JSON.stringify(data)
                                })
                                     
                                                               
                                      
                             }}> Save </Button>
                            <Button variant="contained" color="Secondary"onClick={() => {
                                fetch(URL_GET_JOURNEYS,{
                                    method:'GET',
                                    headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'                                    
                                    },                                   
                                })
                                .then(res => res.json())
                                .then(json => setData(json));

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
    )
}

export default TableJourneys;

