import React, { Component } from 'react'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import './styles/styles.css'
import workspaces from './workspaces.json'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: workspaces,
      selectedWorkspace: []
    }
  }

  selectWorkspace = (selcetedItem) => {
    this.setState({ selectedWorkspace: this.state.workspaces.filter((el) => el.id === selcetedItem) })
  }

  render() {
    const { workspacess, selectedWorkspace } = this.state
    return (
      <div id="container">
        <TitleBar />
        <Sidebar
          workspaces={workspaces}
          onSelection={this.selectWorkspace}
        />
        <Map
          workspaces = {workspaces}
          selectedWorkspace = {selectedWorkspace[0]}
        />
      </div>
    );
  }
}

export default App;
