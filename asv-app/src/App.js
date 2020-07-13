import React from 'react';
import './App.css';
import TableAmbulances from './components/ambulances'
import ResourceStatus from './components/resource_status'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> A.S.V. Ambulance Service. </p>
      </header>
      <ResourceStatus />
      <TableAmbulances />
    </div>
  );
}

export default App;
