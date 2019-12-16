import React from 'react';
import './stylesheets/App.scss'
import { AuthRoute } from './util/route_utils';
import Navbar from './components/navbars/navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
    </div>
  );
}

export default App;
