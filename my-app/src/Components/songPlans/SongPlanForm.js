import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import request from 'superagent';

//import Upload from '../upload/Upload';
//import SongPlan from './SongPlan.css';
//import Dropzone from '../dropzone/Dropzone';

const CLOUDINARY_UPLOAD_PRESET = 'xkcknffm';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dylcapstone-app/video/upload';

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
        level: "", 
        comment:"",
        ifPublic: [],
        ifPublicChoice: "",
        loadingStatus: false,
        uploadedFileCloudinaryUrl: '',
        uploadedFile: null
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructNewSongPlan = evt => {

        evt.preventDefault();
            const newSongPlan = {
                userId: this.state.userId,
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                type: this.state.type,
                levelOption: this.state.level,
                comment: this.state.comment,
                ifPublic: this.state.ifPublicChoice,
                loadingStatus: true
            };

        APIManager.post("songPlans", newSongPlan)
          .then(() => this.props.history.push("/songPlans"))
    }

    // onImageDrop(files) {
    //   this.setState({
    //     uploadedFile: files[0]
    //   });
    //    this.handleImageUpload(files[0])
    // }    
  
    //   handleImageUpload(file) {
    //     let upload = request.post(CLOUDINARY_UPLOAD_URL)
    //                         .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    //                         .field('file', file);
    
    //     upload.end((err, response) => {
    //       if (err) {
    //         console.error(err);
    //       }
    
    //       if (response.body.secure_url !== '') {
    //         this.setState({
    //           uploadedFileCloudinaryUrl: response.body.secure_url
    //         });
    //       }
    //     });
    //   }

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
        <div>
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

            {/* <Dropzone
               onDrop={this.onImageDrop.bind(this)}
               accept="image/*"
              multiple={false}>
               {({getRootProps, getInputProps}) => {
                return (
                   <div  {...getRootProps()} >
                  <input {...getInputProps()} />
          {
          <p>Try dropping some files here, or click to select files to upload.</p>
          }
        </div>
      )
  }}
</Dropzone>
            <div>
              {this.state.uploadedFileCloudinaryUrl === '' ? null :
             <div>
             <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} />
             </div>}
               </div> */}

            <FormGroup>
              <Label for="type">Musical Type</Label>
              <Input type="select" name="type" id="type" onChange={this.handleFieldChange}>
                { this.state.allTypes.map(type =>
                   <option key={type.id} value={type.keyword}>{type.keyword}</option>
                )
                }
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="level">Grade Level</Label>
              <Input type="select" name="level" id="level" onChange={this.handleFieldChange}>
                 { this.state.allGradesLevel.map(level  =>
                 <option key={level.id} value={level.keyword}>{level.keyword}</option>
                 )}
              </Input>
            </FormGroup>
             
            <FormGroup>
              <legend>Would you like this to be Public?</legend>
              <Input type="select" name="ifPublic" id="ifPublicChoice" onChange={this.handleFieldChange}>
             {this.state.ifPublic.map(ifPub=>
                 <option key={ifPub.id} value={ifPub.keyword}>{ifPub.keyword}</option>
             )}
             </Input>
             </FormGroup>
            
          {/* //   <FormGroup>
          //     <Label for="exampleFile">File</Label>
          //     <Input type="file" name="file" id="exampleFile" />
          //     <FormText color="muted">
          // This is some placeholder block-level help text for the above input.
          // It's a bit lighter and easily wraps to a new line.
          //     </FormText>
          //   </FormGroup>  */}

          </Form>
          <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewSongPlan}>Submit</Button>

        </div>
      </>
      );
    }
}

export default withRouter(SongPlanForm)