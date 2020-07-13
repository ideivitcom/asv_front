import React from 'react';
import logo from './logo.svg';
import './App.css';

const Intro = (props) => (
  <p className="App-intro"> 
    Functional component
  </p>
)

function App() {
  return (
    <div className="App">
      <header className="App-header">         
        <p> A.S.V. Ambulance Service. </p>
      </header>
     <Intro />
    </div>
  );
}

export default App;
