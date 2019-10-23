import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import { Button, Navbar } from 'reactstrap';
import './NavBar.css'

class NavigationBar extends Component {

  handleLogout = () => {
    this.props.clearUser();
    this.props.history.push('/');
}

  render(){

    return (
      <Navbar className= "navbar navbar-light light-blue flex-md-nowrap p-0">
      <>
        <div>
          <h3>SongPlan Logo</h3>
        </div>

        <h5>Hi, {this.props.userName} </h5>
          <ul className="nav nav-pills nav-fill">
            <li><Link className='nav-link' to='/songplans'>My Song Plan</Link></li>
            <li><Link className='nav-link' to='/messages'>Messages</Link></li>
            <li><Link className='nav-link' to='/othersongs'>Explore Songs</Link></li>
            <li onClick={this.handleLogout}>Logout</li>
          </ul>
          </>
     </Navbar>
    );
  }
}

export default withRouter(NavigationBar);