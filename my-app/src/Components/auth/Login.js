import React, { Component } from 'react';
import AuthManager from '../../Modules/AuthManager';
//import Registration from '../auth/Registration';
import { withRouter } from "react-router-dom"
import APIManager from "./../../Modules/APIManager";
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button} from 'reactstrap';
import './Login.css';


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
	  console.log(this.props)
    e.preventDefault()
    let userName = this.state.userName;
    let password = this.state.password;

    // Fetch Call and authentication
	AuthManager.getUser(userName).then(response => {
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
                    this.props.setUser(response[0].id, response[0].userName)
			} else {
				console.log('error')
			}
		})
  };

  // Registration
  // Set initial state
	constructor(props) {
		super(props);
	this.state = {
		regUserName: '',
		regPassword: '',
		regEmail: '',
		regPasswordConfirm: '',
		loadingStatus: false,
		modal: false
	}
	this.toggle = this.toggle.bind(this);
}

	toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
		}));
	};

    handleRegistration = e => {
		e.preventDefault();
		this.setState({ loadingStatus: true });
		const registration = {
		userName: this.state.regUserName,
		password: this.state.regPassword,
		email: this.state.regEmail,
		passwordConfirm: this.state.regPasswordConfirm
	};

	APIManager.post("users", registration)
	.then(() => this.props.history.push("/"))
}

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
        <fieldset>
          <h3>Please sign in</h3>
          <div className="flex-login">
            <Input onChange={this.handleFieldChange} type="text" id="userName" placeholder="UserName" required="" autoFocus=""/>
            <Input onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required="" />
          </div>
          <Button type="submit" onClick={this.handleLogin}>Sign in</Button>
          <div>

        <Button onClick={this.toggle} type="button">Do not have an Account? Register Now</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			  <ModalBody>
				<Form onSubmit={this.handleRegistration} id='loginForm'>
				  <ModalHeader toggle={this.toggle}>Register Now</ModalHeader>
					<FormGroup>
					  <Input onChange={this.handleFieldChange} id='regUserName' type='userName'placeholder='User Name' required=''autoFocus=''/>
					</FormGroup>

					<FormGroup>
					  <Input onChange={this.handleFieldChange} type='email' id='regEmail' placeholder='Email' required='' autoFocus=''/>
					</FormGroup>

					<FormGroup>
					  <Input onChange={this.handleFieldChange} type='password' id='regPassword' placeholder='Password' required=''/>
					</FormGroup>

					<FormGroup>
					  <Input onChange={this.handleFieldChange} type='password' id='regPasswordConfirm' placeholder='Confirm Password' required=''/>
					</FormGroup>
					</Form>
              </ModalBody>
          <ModalFooter>
		  <Button type="button" disabled={this.state.loadingStatus} onClick={this.handleRegistration}>Submit</Button>
          </ModalFooter>
      </Modal>
          </div>
        </fieldset>
      </Form>

    )
  }
}

export default withRouter(Login);