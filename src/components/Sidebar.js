import React, {Component} from 'react'
import logo from '../images/logo.png'
import '../styles/styles.css'
import escapeRegExp from "escape-string-regexp";

class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      selected: ''
    }
    this.submitIt = this.submitIt.bind(this)
  }
  

  // Search action
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

  submitIt() {
    document.getElementById('textField').addEventListener('submit', function(event) {
      event.preventDefault();
      alert('hi');
      return false;
    }, false);
  }
  
  render() {

    const {workspaces} = this.props
    const {query} = this.state

    let shownWorkspaces = function() {
      let workspacesToShow
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        workspacesToShow = workspaces.filter((workspace) => match.test(workspace.name))
        console.log(workspacesToShow)
      } else {
        workspacesToShow = workspaces
      }
      return workspacesToShow
    }



    return (
      <nav id='sidebar'>
        <div className="grid-logo">
          <h1 className="sidebar-element">Alexandria Workspaces</h1>
          <img id="logo" className="logo sidebar-element" src={logo} alt="workspaces in Alex"/>
          <p className="slogan sidebar-element">Find your workspace</p>
          <p className="slogan sidebar-element">
            get out of your comfort zone</p>
        </div>
        <div id="search-box" className='search-area sidebar-element'>
          <section className="search-box">
            <form>
              <input
                id="textField"
                type="search"
                onSubmit={()=> this.submitIt()}
                placeholder="Find workspace .."
                onChange={(event) => {
                  this.updateQuery(event.target.value)
                  this.props.onSearch(event.target.value)
                }}></input>
            </form>
          </section>
        </div>
        <ul className='sidebar-element'>
          {
            shownWorkspaces().map((workspace) => (<li key={workspace.id} className='' onClick={(event) => {
                (() => this.props.onSelection(workspace.id))(this.assignSelected(workspace.id))
                event.target.classList.toggle('selected')
              }}>
              {workspace.name}
            </li>))
          }
        </ul >
      </nav>
    );
  }
}

export default Sidebar;
