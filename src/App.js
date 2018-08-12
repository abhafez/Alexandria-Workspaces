import React, { Component } from 'react'
import Sidebar from './components/Sidebar';

// import './App.css'
import './App.scss'

class App extends Component {
  render() {
    return (
      <div id="container">
        <Sidebar />
        <div id="content" className="App-header">
          
        </div>
      </div>
    );
  }
}

export default App;
