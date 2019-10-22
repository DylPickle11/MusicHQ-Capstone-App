import React, { Component } from 'react';
import AuthManager from '../../Modules/AuthManager';
//import Registration from '../auth/Registration';
import { withRouter } from "react-router-dom"
//import APIManager from "./../../Modules/APIManager";
import { Link } from "react-router-dom";
import {Card, CardSubtitle, CardText, Button, CardHeader} from 'reactstrap';
import Registration from './RegistrationForm';

class Login extends Component {
  // Set initial state
  state = {
    userId: "",
    userName: "",
    password: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleLogin = (e) => {
    e.preventDefault()
    let userName = this.state.userName;
    let password = this.state.password;

    // Fetch Call and authentication
    AuthManager.getUser(userName).then(response => {
      console.log(response)
			if (response.length === 0) {
				alert('Please enter a valid User Name.');
			} else if (response.length === 1 && response[0].password !== password) {
				alert('Password is incorrect, please try again.');
				// starting the if statement to check for empty fields//
			} else if (password === '') {
				alert('Please fill the Password Form');
			} else if (userName === '') {
				alert('Please enter a valid userName');
			} else if (response[0].password === password) {

    //response[0].id is the ID of the user you logged in with,
				this.props.setUser(response[0].id);
				this.props.history.push(`/home`);
			}
		});
  };

  render() {
    return (
      <form onSubmit={this.handleLogin}>
        <fieldset>
          <h3>Please sign in</h3>
          <div className="formgrid">
            <input onChange={this.handleFieldChange} type="text" id="userName" placeholder="UserName" required="" autoFocus=""/>
            <input onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required="" />
          </div>
          <button type="submit">Sign in</button>
          <div>
          <Registration {...this.props} />
          </div>
        </fieldset>
      </form>

    )
  }
}

export default withRouter(Login);