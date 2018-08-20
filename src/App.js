import React, { Component } from 'react'
import TitleBar from './components/TitleBar'
import Sidebar from './components/Sidebar'
import Maps from './components/Maps'
import './styles/styles.css'
import workspaces from './workspaces.json'
import escapeRegExp from "escape-string-regexp"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workspaces: workspaces,
      selectedWorkspace: [{}],
      workspacesToShow: workspaces
    }
    this.getMatchQuery = this.getMatchQuery.bind(this)
  }

  selectWorkspace = (selcetedItem) => {
    this.setState({ selectedWorkspace: this.state.workspaces.filter((el) => el.id === selcetedItem) })
  }

  getMatchQuery = (query) => {
    let workspacesToShow
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      workspacesToShow = workspaces.filter((workspace) => match.test(workspace.name))
      console.log(workspacesToShow)
    } else {
      workspacesToShow = workspaces
    }
    this.setState({workspacesToShow: workspacesToShow})
  }
  
  
  render() {
    const { workspaces, selectedWorkspace, workspacesToShow } = this.state
    
    return (
      <div id="container">
        <a class="skip-link screen-reader-text" href="#content">Skip to content</a>
        <TitleBar />
        <Sidebar
          workspaces={workspaces}
          onSelection={this.selectWorkspace}
          onSearch={this.getMatchQuery}
        />
        <main>
          <Maps
            workspaces = {workspacesToShow}
            selectedWorkspace = {selectedWorkspace}
          />
        </main>
      </div>
    );
  }
}

export default App;
