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
      workspacesToShow: workspaces,
      currentMarkerId: null,
      currentSelectedListId: null,
      currentBasicMarkerData: null
    }
    this.getMatchQuery = this.getMatchQuery.bind(this)
  }

  selectWorkspace = (selcetedItem) => {
    this.setState({ selectedWorkspace:
      this.state.workspaces.filter((el) => el.id === selcetedItem)
    })
  }

  getMatchQuery = (query) => {
    let workspacesToShow
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      workspacesToShow = workspaces.filter((workspace) => match.test(workspace.name))
    } else {
      workspacesToShow = workspaces
    }
    this.setState({workspacesToShow: workspacesToShow})
  }

  updateSelectedListId = (id) => {
    const currentBasicMarkerData = this.state.restaurants.find(r => r.id === id)
    this.setState({currentSelectedListId: id, currentBasicMarkerData: currentBasicMarkerData})
  }
  render() {
    const { workspaces, selectedWorkspace, workspacesToShow, currentSelectedListId, currentBasicMarkerData } = this.state

    return (
      <div id="container">
        <a className="skip-link screen-reader-text" href="#content">Skip to content</a>
        <TitleBar />
        <Sidebar
          workspaces={workspaces}
          onSelection={this.selectWorkspace}
          onSearch={this.getMatchQuery}
        />
      <main role="main" id="map">
          <Maps
            workspaces = {workspacesToShow}
            selectedWorkspace = {selectedWorkspace}
            currentSelectedListId={currentSelectedListId}
            currentBasicMarkerData={currentBasicMarkerData}
            setCurrMarkerId={this.setCurrMarkerId}
            updateSelectedListId={this.updateSelectedListId}
          />
        </main>
      </div>
    );
  }
}

export default App;
