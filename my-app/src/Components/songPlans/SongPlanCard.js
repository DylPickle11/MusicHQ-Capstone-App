import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from "./../../Modules/APIManager";
import '../../bootstrap.min.css'
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button, Label} from 'reactstrap';
import CommentCard from '../comments/CommentCard';
import './SongPlan.css'

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
        allComments: [],
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

    handleDelete = () => {
        console.log(this.props)
        this.setState({ loadingStatus: true })
        APIManager.delete("songPlans", this.props.song.id)
          .then(() => APIManager.getUserData("songPlans", this.props.userId))
      }

    pushToFolder = event => {
        let folderSelect = document.getElementById("folderSelect");
        let  folderValue = folderSelect.value;
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const pushSong = {
            userdId: this.state.userId,
            folderId: folderValue,
            songPlanId: this.props.song.id
        };
        APIManager.post("folderPlans", pushSong)
        .then(() => this.props.history.push("/"))
    }

    postComment = event =>{
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const Comment = {
            userId: parseInt(this.state.userId),
            songPlanId: this.props.song.id,
            comment: this.state.comment
        };
       APIManager.post("comments", Comment)
       .then(() => this.props.history.push("/songplans"))
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
                    ifPublic: true,
                    loadingStatus: false
                });
            });
        APIManager.getUserData("folders", this.props.userId).then((allFolders) => {
                this.setState({
                    allFolders: allFolders
                })
            })
        APIManager.getCommentUserExpand(this.props.song.id).then((allComments) => {
            this.setState({
                 allComments: allComments
             })
        })
    }


    render() {
        return (
            <>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Title: {this.props.song.title}</h5>
                <p className="card-text">Description: {this.props.song.description}</p>
                <p className="card-text">{this.props.song.date}</p>

                <h6>Comments</h6>
                <div className="comments">
                  {this.state.allComments.map(comment=>
                   <CommentCard key={comment.id} comment={comment} {...this.props}/>
                  )}
                </div>

                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button className="btn btn-info">Details</Button></Link>

                {/* Modal to Add to Folder*/}
                <button onClick={this.toggle} className="btn btn-primary" type="button">Add to Folder</ button>
                  <Modal isOpen={this.state.modal1} toggle={this.toggle} className={this.props.className}>
			        <ModalBody>
				      <Form onSubmit={this.pushToFolder}>
				        <ModalHeader toggle={this.toggle}>Select A Folder</ModalHeader>

                        <FormGroup>
                          <Label for="folder">Push to Folder</Label>
                            <Input type="select" name="folder" id="folderSelect" onChange={this.handleFieldChange}>
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
		              <Button type="button" disabled={this.state.loadingStatus} onClick={this.pushToFolder}>Save to Folder</Button>
                    </ModalFooter>
                 </Modal>

             {/* Modal For Comments*/}
                <Button onClick={this.toggle2} type="button">Post comment</Button>
                  <Modal isOpen={this.state.modal2} toggle={this.toggle2} className={this.props.className}>
			        <ModalBody>
				      <Form onSubmit={this.toggle2}>
				      <ModalHeader toggle={this.toggle2}>Comment</ModalHeader>
					    <FormGroup>
					     <Input onChange={this.handleFieldChange} id='comment' type='comment'placeholder='comment' required=''autoFocus=''/>
					    </FormGroup>
					  </Form>
                    </ModalBody>
                   <ModalFooter>
		             <Button type="button" disabled={this.state.loadingStatus} onClick={this.postComment}>Comment</Button>
                   </ModalFooter>
                </Modal>
                <Button className="song-btns" color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button>
                </div>
            </div>
            </>
        )
    }
}

export default SongPlanCard
