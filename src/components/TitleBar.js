import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react'

class TitleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="title-bar">
        <MaterialIcon icon="message" invert size='medium' className='toggle-nav-btn' />
      </div>
    );
  }
}

export default TitleBar;