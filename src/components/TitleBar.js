import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hideNavBar = this.hideNavBar.bind(this);
  }

  hideNavBar() {
    let menu = document.getElementById('sidebar');
    menu.classList.toggle('hidden');
    let menuItems = document.querySelectorAll('.sidebar-element')
    menuItems.forEach((el) => {
      // console.log(el.classList)
      // el.classList.toggle('hideItem')
      el.style.display === 'none' ?
      el.style.display = 'block':
      el.style.display = 'none'
    })
    let gridView = document.getElementById('container')
    gridView.style['grid-template-columns'] === '0% 1fr' ?
    gridView.style['grid-template-columns'] = '20% 1fr' :
    gridView.style['grid-template-columns'] = '0% 1fr'
  }
  render() {
    return (
      <div className="title-bar">
        <span id='toggler' onClick={this.hideNavBar}>
          <MaterialIcon
            icon="menu"
            invert
            size='medium'
            className='toggle-nav-btn'
            onClick={this.hideNavBar}
          />
        </span>
      </div>
    );
  }
}


export default TitleBar;