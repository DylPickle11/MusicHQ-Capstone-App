import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import firebaseConfig from '../upload/UploadConfig';
import '../folder/Form.css'


firebase.initializeApp(firebaseConfig);

class SongPlanForm extends Component {
    moment = require('moment');
    date = moment().format('LLL');

    //set the initial state
    state= {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: this.date,
        description: "",
        allTypes: [],
        type: "",
        allGradesLevel: [],
        level: "Instrumental", 
        comment:"",
        ifPublic: [],
        ifPublicChoice: "Yes, please make it Public",
        loadingStatus: false,
        video:'',
        videoURL:'',
        progress: 0
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructNewSongPlan = evt => {
        evt.preventDefault();
            const newSongPlan = {
                userId: parseInt(this.state.userId),
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                type: this.state.type,
                levelOption: this.state.level,
                comment: this.state.comment,
                ifPublic: this.state.ifPublicChoice,
                videoURL: this.state.videoURL,
                loadingStatus: true
            };

        APIManager.post("songPlans", newSongPlan)
          .then(() => this.props.history.push("/songPlans"))
    }

    handleUploadStart = () => {
      this.setState({
        progress: 0
      })
    }

    handleUploadSuccess = filename => {
      this.setState({
        video: filename,
        progress: 100
      })
    firebase.storage().ref().child(filename).getDownloadURL()
    .then(url => this.setState({
      videoURL: url
    }))
    alert('Video Uploaded Successfully')
    }

    handleProgress = progress => {
      this.setState({
        progress: progress
      })
    }

    componentDidMount() { //set state one time
        let levels =[];
        let type = [];
      APIManager.getAll("gradeLevels")
          .then((level =>{levels = level}))
          .then(()=> APIManager.getAll("types"))
          .then((types =>{type= types }))
          .then(()=> APIManager.getAll("ifPublic"))
          .then(ifPublic =>{
            this.setState({
              allTypes: levels,
              allGradesLevel: type,
              ifPublic: ifPublic
            })
          })
      }
  
    render() {
        return (
        <>
        <div className="form">
           <Form>
            <h1>New Song Plan</h1>
            <FormGroup>
               <h6>Date Created:{this.state.date}</h6>
            </FormGroup>

            <FormGroup>
              <Label for="date">Title</Label>
              <Input type="text" name="title" id="title" onChange={this.handleFieldChange} placeholder="place title"/>
            </FormGroup>

            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" onChange={this.handleFieldChange} placeholder="description"/>
            </FormGroup>

            <div>
            <>
   <div>
    <label>Progress</label>
    <p>{this.state.progress}</p>

   </div>
   <FileUploader
   accept='image/*, audio/*, video/*'
   name='video'
   storageRef={firebase.storage().ref()}
   onUploadStart = {this.handleUploadStart}
   onUploadSuccess = {this.handleUploadSuccess}
   onProgress = {this.handleProgress}
   />
   </>
             </div>

            <FormGroup>
              <Label for="type">Grade Level</Label>
              <Input className="input" type="select" name="type" id="type" onChange={this.handleFieldChange}>
                { this.state.allTypes.map(type =>
                   <option key={type.id} value={type.keyword}>{type.keyword}</option>
                )
                }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="level">Music Type</Label>
              <Input className="input" type="select" name="level" id="level" onChange={this.handleFieldChange}>
                 { this.state.allGradesLevel.map(level  =>
                 <option key={level.id} value={level.keyword}>{level.keyword}</option>
                 )}
              </Input>
            </FormGroup>

            <FormGroup>
              <legend>Would you like this to be Public?</legend>
              <Input className="input" type="select" name="ifPublic" id="ifPublicChoice" onChange={this.handleFieldChange}>
             {this.state.ifPublic.map(ifPub=>
                 <option key={ifPub.id} value={ifPub.keyword}>{ifPub.keyword}</option>
             )}
             </Input>
             </FormGroup>
             <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewSongPlan}>Submit</Button>
           </Form>
        </div>
      </>
      );
    }
}

export default withRouter(SongPlanForm)