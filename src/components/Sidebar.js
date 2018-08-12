import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import logo from '../images/logo2.svg'
import './sidebar.scss'

class Sidebar extends Component {
  render() {
    return (
      <nav>
            <img src={logo} alt="logo"/>
        <ul>
          <li>
            <a>
            <MaterialIcon icon="dashboard" invert/>
            <MaterialIcon icon="alarm_on" invert/>
            </a>
          </li>
          <li>
            <a>
              <i class="material-icons">message</i>
            </a>
          </li>
        </ul >
      </nav >
    );
  }
}

export default Sidebar;