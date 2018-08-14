import React, { Component } from 'react'
import Sidebar from './components/Sidebar'
import Map from './components/Map'

// import './App.css'
import './styles/styles.css'

class App extends Component {
  render() {
    return (
      <div id="container">
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
