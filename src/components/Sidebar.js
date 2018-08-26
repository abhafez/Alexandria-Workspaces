import React, { Fragment, Component} from 'react'
import logo from '../images/logo.png'
import '../styles/styles.css'
import escapeRegExp from "escape-string-regexp"
import ReactFitText from 'react-fittext'
import $ from 'jquery'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selected: ''
    }
  }

  // Update Search query in the state
  updateQuery = (query) => {
    this.setState({query: query})
  }

  // On search cancel
  clearQuery = () => {
    this.setState({query: ''})
  }

  assignSelected = (clicked) => {
    this.setState({selected: clicked})
  }

  render() {

    const {workspaces, onSelection} = this.props
    const {query} = this.state

    let shownWorkspaces = function() {
      let workspacesToShow
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        workspacesToShow = workspaces.filter((workspace) => match.test(workspace.name))
      } else {
        workspacesToShow = workspaces
      }
      return workspacesToShow
    }

    // Handle filter list when user clicks enter*/}
    $( "#filter" ).submit(function(e) {
      e.preventDefault();
      $("li").first().focus().select();
    });

    return (
      <ReactFitText compressor={6}>
        <nav id='sidebar'>
          <div className="grid-logo">
            <img id="logo-img" className="logo-img sidebar-element" src={logo} alt="workspaces in Alex"/>
            <p className="slogan sidebar-element">Find your workspace</p>
            <p className="slogan sidebar-element">
              get out of your comfort zone</p>
          </div>
          <div id="search-results">
            <div id="search-box" className='search-area sidebar-element'>
              <section className="search-box">
                <form id="filter">
                  <input
                    tabIndex='1'
                    id="textField"
                    role="searchbox"
                    type="search"
                    onSubmit={() => this.submitIt()}
                    placeholder="Find workspace .."
                    aria-label="Search through workspaces"
                    onChange={(event) => {
                      this.updateQuery(event.target.value)
                      this.props.onSearch(event.target.value)
                      }
                    }
                    onKeyPress={(e)=>{console.log(e.key)}}
                  >
                  </input>
                </form>
              </section>
            </div>
            <ul
              role="menu"
              className='sidebar-element'
            >
              {
                shownWorkspaces().map((workspace) => (
                  <Fragment key={workspace.id}>
                    <li
                      role='listitem link'
                      tabIndex="2"
                      aria-labelledby="textField"
                      onClick={(event) => {
                        (() => onSelection(workspace.id))(this.assignSelected(workspace.id))
                        event.target.classList.toggle('selected')
                    }}
                    onKeyPress={(event) => {
                        (() => onSelection(workspace.id))(this.assignSelected(workspace.id))
                        event.target.classList.toggle('selected')
                    }}
                    >
                      {workspace.name}
                    </li>
                  </Fragment>
                ))
              }
            </ul>
        </div>
        </nav>
      </ReactFitText>
  );
  }
}

export default Sidebar;
