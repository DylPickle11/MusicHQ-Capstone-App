import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Button } from 'reactstrap';
import './NavBar.css'


class NavigationBar extends Component {
  handleLogout = () => {
    this.props.clearUser();
    //this.props.history.push('/Login')
}
  render() {
    
    return (
      <Navbar className= "navbar navbar-light light-blue flex-md-nowrap p-0">
      <>

        <h5>Hi, {this.props.userName}</h5>
          <ul className="nav nav-pills nav-fill">
            <li><Link className='nav-link' to='/songplans'>My Song Plan</Link></li>
            <li><Link className='nav-link' to='/messages'>Messages</Link></li>
            <li><Link className='nav-link' to='/search'>Explore Songs</Link></li>
            <li><Button onClick={this.props.clearUser}>Logout</Button></li>
          </ul>
          </>
     </Navbar>
    );
  }

}

export default withRouter(NavigationBar);