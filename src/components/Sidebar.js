import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import logo from '../images/logo1.svg'
import '../styles/styles.css'

class Sidebar extends Component {
  render() {
    return (
      <nav>
        <img id="logo" className="logo" src={logo} alt="logo" />
        <ul>
          <li>
            <a>
              <MaterialIcon icon="dashboard" invert />
            </a>
          </li>
          <li>
            <a><MaterialIcon icon="alarm_on" invert /></a>
            </li>
          <li>
            <a>
              <i className="material-icons">message</i>
            </a>
          </li>
        </ul >
      </nav >
    );
  }
}

export default Sidebar;