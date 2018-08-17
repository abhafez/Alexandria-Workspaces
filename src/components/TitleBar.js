import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenByClick: false
    };
    this.toggleBarVisibility = this.toggleBarVisibility.bind(this)
    this.sideBarVisibility = this.sideBarVisibility.bind(this)
    this.hideShowMenu = this.hideShowMenu.bind(this)
  }

  componentDidMount() {

    window.onload = this.sideBarVisibility;

    //  this function can should be refactored because it looks
    window.addEventListener('resize', this.sideBarVisibility)
  }

  sideBarVisibility() {
    if (this.state.hiddenByClick !== true &&
      window.innerWidth <= 770 &&
      !document.getElementById('sidebar').classList.contains('hidden')) {
      return this.toggleBarVisibility()
    } else if (this.state.hiddenByClick !== true &&
      window.innerWidth > 770 &&
      document.getElementById('sidebar').classList.contains('hidden')) {
      return this.toggleBarVisibility()
    }
  }

  toggleBarVisibility() {
    let menu = document.getElementById('sidebar');
    menu.classList.toggle('hidden');
    let menuItems = document.querySelectorAll('.sidebar-element')
    menuItems.forEach((el) => {
      el.style.display === 'none' ?
        el.style.display = 'block' :
        el.style.display = 'none'
    })

    let gridView = document.getElementById('container')
    gridView.style['grid-template-columns'] === '0% 1fr' ?
      gridView.style['grid-template-columns'] = '20% 1fr' :
      gridView.style['grid-template-columns'] = '0% 1fr'
  }

  hideShowMenu() {
    this.toggleBarVisibility()
    console.log("ehhh")
    this.setState(prevState => ({ hiddenByClick: !prevState.hiddenByClick }))
  }
  render() {
    return (
      <div className="title-bar">
        <span id='toggler' onClick={this.toggleBarVisibility}>
          <MaterialIcon
            icon="menu"
            invert
            size='medium'
            className='toggle-nav-btn'
            onClick={this.hideShowMenu}
          />
        </span>
      </div>
    );
  }
}


export default TitleBar;