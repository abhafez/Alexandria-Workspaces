import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import logo from '../images/logo1.svg'
import '../styles/styles.css'
import escapeRegExp from "escape-string-regexp";

class Sidebar extends Component {
  state = {
    query: '',
    selected: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  clearQuery = () => {
    this.setState({query: ''})
  }

  assignSelected = (clicked) => {
    this.setState({ selected: clicked })
  }
  render() {

    const { workspaces } = this.props
    const { query } = this.state

    let shownWorkspaces
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      shownWorkspaces = workspaces.filter((workspace) => match.test(workspace.name))
    } else {
      shownWorkspaces = workspaces
    }

    console.log(shownWorkspaces);
    return (
      <nav id='sidebar'>
        <img id="logo" className="logo sidebar-element" src={logo} alt="workspaces in Alex" />
        <div className='search-area sidebar-element'>
          <section className="search-box">
            <form>
              <input
              type="search"
              placeholder="Find workspace .."
              onChange={(event) => this.updateQuery(event.target.value)}>
              </input>
              <button><MaterialIcon icon="location_on" invert /></button>
            </form>
          </section>
        </div>
        <ul className='sidebar-element'>
          {shownWorkspaces.map((workspace) => (
            <li key={workspace.id}
            onClick={(event) => {
              (() => this.props.onSelection(workspace.id))
              (this.assignSelected(workspace.id))
              }}
              // onClick={
              //   // () =>   console.log(workspace.id)
              // }
              >
              {workspace.name}
            </li>
          ))}
        </ul >
      </nav>
    );
  }
}

export default Sidebar;