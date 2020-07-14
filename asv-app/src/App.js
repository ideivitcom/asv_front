import React from 'react';
import './App.css';
import TableAmbulances from './components/ambulances'
import ResourceStatus from './components/resource_status'
import TableJourneys from './components/journeys'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> A.S.V. Ambulance Service. </p>
      </header>
      <ResourceStatus />
      <TableAmbulances />
      <TableJourneys />
    </div>
  );
}

export default App;
