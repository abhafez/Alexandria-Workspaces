import React, { Component } from "react";
import TitleBar from "./components/TitleBar";
import Sidebar from "./components/Sidebar";
import Maps from "./components/Maps";
import "./styles/styles.css";
import workspaces from "./workspaces.json";
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    workspaces: workspaces,
    workspacesToShow: workspaces,
    currentMarkerId: null,
    currentSelectedListId: null,
    currentBasicMarkerData: null,
  };

  getMatchQuery = query => {
    let workspacesToShow;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      workspacesToShow = workspaces.filter(workspace =>
        match.test(workspace.name)
      );
    } else {
      workspacesToShow = workspaces;
    }
    this.setState({ workspacesToShow: workspacesToShow });
  };

  setCurrentMarkerId = id => {
    this.setState({ currentMarkerId: Number(id) });
  };

  updateSelectedId = id => {
    const currentBasicMarkerData = this.state.workspaces.find(
      workspace => workspace.id === Number(id)
    );
    this.setState({
      currentSelectedListId: Number(id),
      currentBasicMarkerData: currentBasicMarkerData
    });
  };
  render() {
    const {
      workspaces,
      selectedWorkspace,
      workspacesToShow,
      currentSelectedListId,
      currentBasicMarkerData,
      currentMarkerId
    } = this.state;

    return (
      <div id="container">
        <a className="skip-link screen-reader-text" href="#textField">
          Skip to search
        </a>
        <TitleBar />
        <Sidebar
          workspaces={workspaces}
          currentMarkerId={currentMarkerId}
          onSelection={this.selectWorkspace}
          onSearch={this.getMatchQuery}
          setCurrentMarkerId={this.setCurrentMarkerId}
          updateSelectedId={this.updateSelectedId}
          clearMap={this.onMapClicked}
        />
        <main role="main" id="map">
          <Maps
            workspaces={workspacesToShow}
            currentMarkerId={currentMarkerId}
            selectedWorkspace={selectedWorkspace}
            currentSelectedListId={currentSelectedListId}
            currentBasicMarkerData={currentBasicMarkerData}
            setCurrentMarkerId={this.setCurrentMarkerId}
            updateSelectedId={this.updateSelectedId}
            clearMap={this.onMapClicked}
          />
        </main>
      </div>
    );
  }
}

export default App;
