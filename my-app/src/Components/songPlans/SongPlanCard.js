import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from "./../../Modules/APIManager";
import {Card, CardSubtitle, CardText,CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class SongPlanCard extends Component {
  // Set initial state
	constructor(props) {
		super(props);
	this.state = {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: this.date,
        description: "",
        type: "",
        levelOption: "",
        ifPublic: "",
		comment: "",
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

	 // set state to value of input
     handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    // update edited task object
    updateSongPlan = event => {
		console.log(this.props.song.id)
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const editedSongPlan = {
            id: this.props.song.id,
            title: this.state.title,
            date: this.state.date,
            description: this.state.description,
            type: this.state.type,
			levelOption: this.state.levelOption,
			comment: this.state.comment,
            ifPublic: true,
            loadingStatus: true
        };
        // push edited task
        APIManager.update("songPlans", editedSongPlan)
            .then(() => this.props.history.push("/home"))
    }

    componentDidMount() {
        APIManager.get("songPlans", this.props.song.id)
            .then(SongPlan => {
                this.setState({
                    title: SongPlan.title,
                    date: SongPlan.date,
                    description: SongPlan.description,
                    type: SongPlan.type,
					levelOption: SongPlan.levelOption,
					comment: SongPlan.comment,
                    ifPublic: true,
                    loadingStatus: false
                });
            });
    }


    render() {
        return (
            <Card className="songPlan-Card">
                <CardHeader>Title:{this.props.song.title}</CardHeader>
                <CardText>description:{this.props.song.description}</CardText>
                <CardSubtitle>{this.props.song.date}</CardSubtitle>
                <CardSubtitle>Comment:{this.props.song.comment}</CardSubtitle>
                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>Details</Button></Link>
                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>AddSongPLan</Button></Link>


             {/* Modal For Comments*/}
                <Button onClick={this.toggle} type="button">Post comment</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
			        <ModalBody>
				      <Form onSubmit={this.updateSongPlan}>
				      <ModalHeader toggle={this.toggle}>Register Now</ModalHeader>
					    <FormGroup>
					     <Input onChange={this.handleFieldChange} id='comment' type='comment'placeholder='comment' required=''autoFocus=''/>
					    </FormGroup>
					  </Form>
                    </ModalBody>
                   <ModalFooter>
		             <Button type="button" disabled={this.state.loadingStatus} onClick={this.updateSongPlan}>Comment</Button>
                   </ModalFooter>
                </Modal>
            </Card>
        )
    }
}

export default SongPlanCard
