import React, { useEffect } from "react";
import MaterialTable from 'material-table';
import 'whatwg-fetch';


function TableAmbulances() {
    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Ambulance Id', field: 'id' },
        { title: 'Max Capacity', field: 'seats' },

    ]);

    const URL_GET_AMBULANCES = 'http://localhost:5000/api/ambulances'

    const [data, setData] = useState([]);
    const [dirty, setDirty] = useState(false)

    useEffect(() => {
        fetch(URL_GET_AMBULANCES)
            .then(res => res.json())
            .then(json => setData(json));

    }, [])

    return (
        <MaterialTable
            title="Ambulances"
            columns={columns}
            data={data}
            options={{
                paging: false,
                search: false
            }}
            data={
                data
            }
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

export default TableAmbulances;
