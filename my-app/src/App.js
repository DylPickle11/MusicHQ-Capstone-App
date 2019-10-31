import React, { Component } from 'react';
import ApplicationViews from './Components/ApplicationViews';
import './App.css'
import './bootstrap.min.css';
//import Nav from './components/nav/Nav';
import Login from './Components/auth/Login';
import NavigationBar from './Components/nav/NavBar';
//import { withRouter } from 'react-router-dom'
//import Registration from './Components/auth/Registration';


let userName = sessionStorage.getItem('userName')
class App extends Component {

  state = {
	  user: sessionStorage.getItem('activeUser') !== null, //Evaluates True or False
    activeUserId: this.getUser(),
    userName: userName
  };

	//Check if credentials are in session storage
  //returns true/false

  isAuthenticated = () => sessionStorage.getItem('activeUserId') !== null;

  setUser = (id, username) => {
    sessionStorage.setItem('activeUser', id);
    sessionStorage.setItem('userName', username);
		this.setState({ activeUserId: this.getUser(), user: true });
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
    sessionStorage.removeItem('userName');
		this.setState({
			user: false
		});
  };

  handleLogout = () => {
        this.clearUser();
        this.props.history.push('/Login')
  }


  render() {
  
    return(
      <>
       {this.state.user ?
      <>
       <NavigationBar userId={this.state.userId} userName={this.state.userName} clearUser={this.clearUser} {...this.props}/>

       <ApplicationViews userId={this.state.activeUserId} userName={this.state.userName} handleLogout={this.handleLogout} clearUser={this.clearUser}/>
      </>
      : <Login setUser={this.setUser} userId={this.state.activeUserId} userName={this.state.userName} {...this.props}/>
  }
      </>
    )
    }
  }



export default App;
