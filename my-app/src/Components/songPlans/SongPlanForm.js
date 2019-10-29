import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';
//import Upload from '../upload/Upload';
//import SongPlan from './SongPlan.css';
//import Dropzone from '../dropzone/Dropzone';

class SongPlanForm extends Component {
    moment = require('moment');
    date = moment().format('LLL');

    //set the initial state
    state= {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: this.date,
        description: "",
        type: "",
        levelOption: "",
        comment:"",
        ifPublic: "",
        loadingStatus: false
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructNewSongPlan = evt => {
      console.log(this.state.userId)
        evt.preventDefault();
            const newSongPlan = {
                userId: this.state.userId,
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                type: this.state.type,
                levelOption: this.state.level,
                comment: this.state.comment,
                ifPublic: this.state.ifPublic,
                loadingStatus: true
            };

        APIManager.post("songPlans", newSongPlan)
          .then(() => this.props.history.push("/songPlans"))
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

             {/*
            <div className="App">
             <div className="Card">
               <Dropzone onFilesAdded={console.log} />
               <Label for="video">video</Label>
               <Upload type="video" name="video" id="video" onChange={this.handleFieldChange}/>
             </div>
            </div>*/}

            <FormGroup>
              <Label for="type">Musical Type</Label>
              <Input type="select" name="type" id="type" onChange={this.handleFieldChange} multiple>
                <option>Instrumental</option>
                <option>Vocal</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="level">Grade Level</Label>
              <Input type="select" name="level" id="level" onChange={this.handleFieldChange}>
                <option value="Early Elementary">Early Elementary</option>
                <option value="Late Elementary">Late Elementary</option>
                <option value="Middle School">Middle School</option>
                <option value="Early High School">Early High School</option>
                <option value="Late High School">Late High School</option>
              </Input>
            </FormGroup>

            <FormGroup onChange={this.handleFieldChange}>
              <legend>Would you like this to be Public?</legend>

            <FormGroup check>
              <Label check>
              <Input type="radio" name="radio1" id="ifPublic" onChange={this.handleFieldChange}/>{' '}
              Please make it Public!
              </Label>
            </FormGroup>

            <FormGroup check>
              <Label check>
              <Input type="radio" name="radio1" id="ifPublic" onChange={this.handleFieldChange} />{' '}
              Keep it Private!
              </Label>
           </FormGroup>
          </FormGroup>
            {/*
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
              </FormText>
            </FormGroup> */}

          </Form>
          <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewSongPlan}>Submit</Button>

        </div>
      </>
      );
    }
}

export default withRouter(SongPlanForm)