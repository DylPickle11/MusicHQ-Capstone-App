import React, { Component } from 'react';
import ApplicationViews from './Components/ApplicationViews';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Nav from './components/nav/Nav';
import Login from './Components/auth/Login'
import './App.css';
//import { withRouter } from 'react-router-dom'
//import Registration from './Components/auth/Registration';

class App extends Component {

  state = {
		user: sessionStorage.getItem('activeUser') !== null, //Evaluates True or False
    activeUserId: this.getUser(),
    userName: this.getUserName()
  };

	//Check if credentials are in session storage
  //returns true/false

  isAuthenticated = () => sessionStorage.getItem('activeUser') !== null;

  setUser = (id, username) => {
    sessionStorage.setItem('activeUser', id);
    sessionStorage.setItem('userName', username);
		this.setState({ activeUser: this.getUser(), user: true });
	};

	getUser() {
		if (sessionStorage.getItem('activeUser')) {
			return parseInt(sessionStorage.getItem('activeUser'));
		} else {
			return '';
    }

  }
  getUserName() {
		if (sessionStorage.getItem('userName')) {
			return sessionStorage.getItem('userName');
		} else {
			return '';
    }

	}

	clearUser = () => {
		sessionStorage.removeItem('activeUser');
		this.setState({
			user: this.isAuthenticated()
		});
  };


  render() {
    return(
      <>
       {this.state.user ?
      <>
       <ApplicationViews userId={this.state.activeUserId} userName={this.state.userName}/>
      </>
      : <Login setUser={this.setUser} userId={this.state.userId} userName={this.state.userName} {...this.props} />
  }
      </>
    )
    }
  }



export default App;
