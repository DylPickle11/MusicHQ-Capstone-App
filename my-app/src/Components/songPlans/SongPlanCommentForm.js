import React, { Component } from 'react';
import AuthManager from '../../Modules/AuthManager';
//import Registration from '../auth/Registration';
import { withRouter } from "react-router-dom"
import APIManager from "./../../Modules/APIManager";
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button} from 'reactstrap';


class Login extends Component {
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
	}

	// Update state whenever an input field is edited
	handleFieldChange = evt => {
		const stateToChange = {};
		stateToChange[evt.target.id] = evt.target.value;
		this.setState(stateToChange);
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
	.then(() => this.props.history.push("/users"))
}

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
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
      </Form>

    )
  }
}

export default withRouter(Login);