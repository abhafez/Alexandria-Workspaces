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
      selectedId: ''
    }
  }

  selectWorkspace = (selcetedItem) => {
    this.setState({selectedId: this.state.workspaces.filter((el) => el.id === selcetedItem)})
  }

  render() {
    return (
      <div id="container">
        <TitleBar />
        <Sidebar
        workspaces={this.state.workspaces}
        onSelection={this.selectWorkspace}
        />
        <Map/>
      </div>
    );
  }
}

export default App;
