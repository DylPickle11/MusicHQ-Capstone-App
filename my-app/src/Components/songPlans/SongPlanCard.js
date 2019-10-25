import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from "./../../Modules/APIManager";
import {Card, CardSubtitle, CardText,CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button, Label} from 'reactstrap';
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
        allFolders: [],
		loadingStatus: false,
        modal1: false,
        modal2: false
	}
	this.toggle = this.toggle.bind(this);
}

	toggle = () => {
        this.setState(prevState => ({
            modal1: !prevState.modal1
		}));
    }

    toggle2 = () => {
        this.setState(prevState => ({
            modal2: !prevState.modal2
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

    pushToFolder = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const pushSong = {
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
        APIManager.update("", pushSong)
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
        APIManager.getAll("folders").then((allFolders) => {
                this.setState({
                    allFolders: allFolders
                })
            })
    }


    render() {
        return (
            <Card className="songPlan-Card">
                <CardHeader>Title:{this.props.song.title}</CardHeader>
                <CardText>description:{this.props.song.description}</CardText>
                <CardSubtitle>{this.props.song.date}</CardSubtitle>
                <CardSubtitle>Comment:{this.props.song.comment}</CardSubtitle>
                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>Details</Button></Link>

                {/* Modal to Add to Folder*/}
                <Button onClick={this.toggle} type="button">Add to Folder</Button>
                  <Modal isOpen={this.state.modal1} toggle={this.toggle} className={this.props.className}>
			        <ModalBody>
				      <Form onSubmit={this.pushToFolder}>
				        <ModalHeader toggle={this.toggle}>Select A Folder</ModalHeader>

                        <FormGroup>
                          <Label for="folder">Push to Folder</Label>
                            <Input type="select" name="folder" id="folder" onChange={this.handleFieldChange}>
                        {
                            this.state.allFolders.map(folder =>
                                <option key={folder.id} value={folder.id}>{folder.title}</option>
                            )
                        }
                         </Input>
                        </FormGroup>
					  </Form>
                    </ModalBody>
                    <ModalFooter>
		              <Button type="button" disabled={this.state.loadingStatus} onClick={this.pushToFolder}>Comment</Button>
                    </ModalFooter>
                 </Modal>

             {/* Modal For Comments*/}
                <Button onClick={this.toggle2} type="button">Post comment</Button>
                  <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
			        <ModalBody>
				      <Form onSubmit={this.updateSongPlan}>
				      <ModalHeader toggle={this.toggle2}>Register Now</ModalHeader>
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
