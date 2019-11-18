import React, {} from 'react';
import './App.css';

//Component Imports
import { navbar as Navbar } from '../layout/navbar'
import { landing as Landing } from '../layout/landing'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Landing />
    </div>
  );
}

export default App;
