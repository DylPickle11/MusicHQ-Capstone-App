import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar } from 'reactstrap';
import './NavBar.css'
import APIManager from '../../Modules/APIManager';

class NavigationBar extends Component {
  state = {
    userId: sessionStorage.getItem('activeUser'),
    userName: sessionStorage.getItem('activeUser')
  	};

  clearUser = () => {
		sessionStorage.removeItem('activeUser');
		this.setState({
			user: this.isAuthenticated()
		});
  };

  isAuthenticated = () => sessionStorage.getItem('activeUser') !== null;
  activeUserName = this.state.userId;


  handleLogout = () => {
    this.clearUser();
    this.props.history.push('/Login');
}

userName () {
  //get userID
  let userId = this.state.userId;
  APIManager.get('users', userId).then(response =>{
    let userNameE = response.userName
    console.log(userNameE)
  })

};

  render() {
    return (
      <Navbar className= "navbar navbar-light light-blue flex-md-nowrap p-0">
      <>
        <div>
          <h3>SongPlan Logo</h3>
        </div>

        <h5>Hi, {this.state.userName}</h5>
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