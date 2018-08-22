import React, {Component} from 'react';
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
    window.addEventListener('resize', this.sideBarVisibility)
  }

  sideBarVisibility() {
    if (
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
    // Accessibility related
    let trigger = document.getElementById('toggler');
    trigger.getAttribute('aria-expanded') === 'false'
      ? trigger.setAttribute('aria-expanded', true)
      : trigger.setAttribute('aria-expanded', false);

    // toogle sidebar
    let menu = document.getElementById('sidebar');
    menu.classList.toggle('hidden');
    let menuItems = document.querySelectorAll('.sidebar-element')
    menuItems.forEach((el) => {
      el.style.display === 'none'
        ? el.style.display = 'block'
        : el.style.display = 'none'
    })

    // grid response on resize
    let gridView = document.getElementById('container')
    gridView.style['grid-template-columns'] === '0% 1fr'
      ? gridView.style['grid-template-columns'] = '20% 1fr'
      : gridView.style['grid-template-columns'] = '0% 1fr'
  }

  hideShowMenu() {
    this.toggleBarVisibility()
    this.setState(prevState => ({
      hiddenByClick: !prevState.hiddenByClick
    }))
  }
  render() {
    return (
      <div className="title-bar" id="title-bar">
        <span id='toggler' aria-expanded="true" onClick={this.hideShowMenu}>
          <MaterialIcon icon="menu" invert="invert" size='medium' className='toggle-nav-btn'/>
        </span>
        <div className="logo-container">
          <h1 className="logo" id='logo'>Alexandria Workspaces</h1>
        </div>
    </div>
    );
  }
}

export default TitleBar;
