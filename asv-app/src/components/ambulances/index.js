import React from "react";
import MaterialTable from 'material-table';
import 'whatwg-fetch';


function TableAmbulances() {
    const { useState } = React;
  
    const [columns, setColumns] = useState([
      { title: 'Ambulance Id', field: 'id' },
      { title: 'Max Capacity', field: 'seats' },
     
    ]);

    const URL_GET_AMBULANCES = 'http://localhost:5000/api/ambulances'

    const [data, setData] = useState([
      
    ]);
  
    return (
      <MaterialTable
        title="Ambulances"
        columns={columns}
        data={data}
        options={{
          search:false
        }}
        data={query =>
          new Promise((resolve, reject) => {
            let url = URL_GET_AMBULANCES           
            fetch(url)
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result,                 
                  totalCount: result.total,
                })
              })
          })
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
  