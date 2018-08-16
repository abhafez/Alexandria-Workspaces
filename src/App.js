import React, { Component } from 'react'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import './styles/styles.css'
import workspaces from './workspaces.json'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const elem = workspaces
    console.log(elem)
    return (
      <div id="container">
        <ul>
          {Object.keys(elem).map((i) => <li key={i}>{i}</li>)}
        </ul>
        <TitleBar />
        <Sidebar />
        <Map />
      </div>
    );
  }
}

export default App;
