import React, { Component } from 'react'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import Maps from './components/Maps'
import './styles/styles.css'
import workspaces from './workspaces.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: workspaces,
      selectedWorkspace: [{}]
    }
  }

  selectWorkspace = (selcetedItem) => {
    this.setState({ selectedWorkspace: this.state.workspaces.filter((el) => el.id === selcetedItem) })
  }

  render() {
    const { workspaces, selectedWorkspace } = this.state
    return (
      <div id="container">
        <TitleBar />
        <Sidebar
          workspaces={workspaces}
          onSelection={this.selectWorkspace}
        />
        <main>
          <Maps
            workspaces = {workspaces}
            selectedWorkspace = {selectedWorkspace}
          />
        </main>
      </div>
    );
  }
}

export default App;
