import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from "./../../Modules/APIManager";
import {Card, CardSubtitle, CardText,CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class SongPlanCard extends Component {
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
            <Card className="songPlan-Card">
                <CardHeader>{this.props.song.title}</CardHeader>
                <CardText>{this.props.song.description}</CardText>
                <CardSubtitle>{this.props.song.date}</CardSubtitle>
                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>Details</Button></Link>
                <Button type="button" onClick={() => { this.props.history.push(`/songPlans/${this.props.song.id}/comment`) }}>Post comment</Button>
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

            </Card>
        )
    }
}

export default SongPlanCard
