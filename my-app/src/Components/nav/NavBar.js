import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button } from 'reactstrap';
import './NavBar.css'


class NavigationBar extends Component {
  handleLogout = () => {
    this.props.clearUser();
    //this.props.history.push('/Login')
}
  render() {
    return (
      <>
      <nav className= "navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#">SongPlan Logo</a>
         {/* <li className='nav-link'>Welcome, {this.props.userName}</li> */}
          <ul className="nav nav-pills nav-fill">
            <li><Link className='nav-link' to='/songplans'>My Song Plan</Link></li>
            <li><Link className='nav-link' to='/folders'>My Folders</Link></li>
            <li><Link className='nav-link' to='/friends'>My Friends</Link></li>
            <li><Link className='nav-link' to='/messages'>Messages</Link></li>
            <li><Link className='nav-link' to='/search'>Explore Songs</Link></li>
            <li><Button onClick={this.props.clearUser}>Logout</Button></li>
          </ul>
     </nav>
     </>
    );
  }

}

export default withRouter(NavigationBar);
