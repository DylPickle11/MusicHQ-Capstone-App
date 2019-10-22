import React, {Component, useState} from 'react';
import { Link } from "react-router-dom";
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import ApplicationViews from './Components/ApplicationViews';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Nav from './components/nav/Nav';
import Login from './Components/auth/Login'
import './App.css';
//import { withRouter } from 'react-router-dom'
//import Registration from './Components/auth/Registration';

class App extends Component {
  state = {
		user: sessionStorage.getItem('activeUser') !== null,
		activeUser: this.getUser()
  };

	//Check if credentials are in session storage
  //returns true/false

	isAuthenticated = () => sessionStorage.getItem('activeUser') !== null;

  setUser = id => {
		sessionStorage.setItem('activeUser', id);
		this.setState({ activeUser: this.getUser(), user: true });
	};

	getUser() {
		if (sessionStorage.getItem('activeUser')) {
			return parseInt(sessionStorage.getItem('activeUser'));
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
       <ApplicationViews userId={this.state.userId}/>
      </>
      : <Login setUser={this.setUser} {...this.props} />
  }
      </>
    )
    }
  }



export default App;
