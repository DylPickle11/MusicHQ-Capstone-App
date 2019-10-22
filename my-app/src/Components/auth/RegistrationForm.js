import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager';
import {Form, Input, FormGroup, Label, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

class Registration extends Component {
	// Set initial state
	constructor(props) {
		super(props);
	this.state = {
		regUserName: '',
		regPassword: '',
		regEmail: '',
		regPasswordConfirm: '',
		loadingStatus: false,
		modal: true
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
			<>
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
			</>
		);
	}
}

export default Registration;