import React, { Component } from 'react'
import TitleBar from './components/TitleBar';
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import './styles/styles.css'

class App extends Component {
  render() {
    return (
      <div id="container">
        <TitleBar />
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
