import React from 'react';
import './App.css';
import TableAmbulances from './components/ambulances'



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> A.S.V. Ambulance Service. </p>
      </header>
      <TableAmbulances />
    </div>
  );
}

export default App;
