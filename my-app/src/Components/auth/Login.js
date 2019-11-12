import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AuthManager from '../../Modules/AuthManager';
import APIManager from './../../Modules/APIManager';
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup } from 'reactstrap';
import './Login.css';


class Login extends Component {
  state = {
    userId: '',
    userName: '',
	password: '',
	regUserName: '',
	regPassword: '',
	regEmail: '',
	regPasswordConfirm: '',
	loadingStatus: false,
	modal: false
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
		}).then(()=> this.props.history.push('/songplans'))
  };

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
	.then((user)=>
	this.props.setUser(user.id, user.userName)
	)
	.then(() => this.props.history.push("/songplans"))
}

  render() {
    return (
      <>
	    <h1 className="header">SongPlan</h1>
        <div className="flex-parent">
          <div className="flex-form">
            <h3>Please sign in</h3>
            <div className="flex-login">
		      <form className="form-group" onSubmit={this.handleLogin}></form>
			  <FormGroup>	
                <input className="space" className="form-control" onChange={this.handleFieldChange} type="text" id="userName" placeholder="UserName" required="" autoFocus=""/>
			  </FormGroup>	
			  <FormGroup>		
                <input className="space" className="form-control" onChange={this.handleFieldChange} type="password" id="password" placeholder="Password" required="" />
			  </FormGroup>	
				<button type="button" className="btn btn-primary" onClick={this.handleLogin}>Sign in</button>
                <button className="btn btn-primary" onClick={this.toggle} type="button">Do not have an Account? Register Now</button>
		    </div>
		  </div>
		</div>

	        	{/* Registration Modal */}
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
		    <ModalBody>
			  <Form className='form-group' onSubmit={this.handleRegistration} id='loginForm'>
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
		      <button type="button" disabled={this.state.loadingStatus} onClick={this.handleRegistration}>Submit</button>
            </ModalFooter>
          </Modal>
	 </>
    )
  }
}
export default withRouter(Login);