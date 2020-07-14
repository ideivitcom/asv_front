import React from 'react';
import './App.css';
import TableAmbulances from './components/ambulances'
import ResourceStatus from './components/resource_status'
import TableJourneys from './components/journeys'
import TransferForm from './components/transfer'
import LocateForm from './components/locate'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> A.S.V. Ambulance Service. </p>
      </header>
      <ResourceStatus />
      <TableAmbulances />
      <TableJourneys />
      <TransferForm />
      <LocateForm />
    </div>
  );
}

export default App;
