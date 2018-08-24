import React, {Component} from 'react';
import MaterialIcon from 'material-icons-react'
import ReactFitText from 'react-fittext'


class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenByClick: false
    };
    this.toggleBarVisibility = this.toggleBarVisibility.bind(this)
    this.hideShowMenu = this.hideShowMenu.bind(this)
  }

  componentDidMount() {
    window.onload = this.sideBarVisibility;
    window.addEventListener('resize', this.sideBarVisibility)
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
          <MaterialIcon icon="menu" invert size='medium' className='toggle-nav-btn'/>
        </span>
        <ReactFitText compressor={6}>
          <div id="logo-text">
            <h1 className="sidebar-element">Alexandria Workspaces</h1>
          </div>
      </ReactFitText>
    </div>
    );
  }
}

export default TitleBar;
