import React, { Component } from 'react'
import MaterialIcon from 'material-icons-react'
import logo from '../images/logo1.svg'
import '../styles/styles.css'

class Sidebar extends Component {
  render() {
    return (
      <nav id='sidebar'>
        <img id="logo" className="logo sidebar-element" src={logo} alt="workspaces in Alex" />
        <div className='search-area sidebar-element'>
          <section className="search-box">
            <form action="" method="">
              <input type="search" placeholder="Find workspace .."></input>
              <button><MaterialIcon icon="location_on" invert /></button>
            </form>
          </section>
        </div>
        <ul className='sidebar-element'>
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
      </nav>
    );
  }
}

export default Sidebar;