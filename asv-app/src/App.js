import React from 'react';
import Intro from './components/Intro';
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">         
        <p> A.S.V. Ambulance Service. </p>
      </header>
     <Intro msg="Hola!" />
    </div>
  );
}

export default App;
