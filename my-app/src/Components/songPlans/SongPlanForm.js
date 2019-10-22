import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button, FormText, } from 'reactstrap';
import Upload from '../upload/Upload';
//import SongPlan from './SongPlan.css';
import Dropzone from '../dropzone/Dropzone';

class SongPlanForm extends Component {
    //set the initial state
    state= {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: "",
        description: "",
        video: "",
        keywordId: "",
        ifPublic: true,
        loadingStatus: false
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructNewSongPlan = evt => {
        evt.preventDefault();
            const newSongPlan = {
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                video: this.state.video,
                keywordId: this.state.keywordId,
                ifPublic: true,
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
              <Label for="date">Title</Label>
              <Input type="text" name="title" id="title" onChange={this.handleFieldChange} placeholder="place title"/>
            </FormGroup>

            <FormGroup>
               <Label for="date">Date</Label>
               <Input type="date" name="date" id="date" onChange={this.handleFieldChange} placeholder="place date"/>
            </FormGroup>

            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" onChange={this.handleFieldChange} placeholder="description"/>
            </FormGroup>

            <div className="App">
             <div className="Card">
               <Dropzone onFilesAdded={console.log} />
               <Label for="video">video</Label>
               <Upload type="video" name="video" id="video" onChange={this.handleFieldChange}/>
             </div>
            </div>

            <FormGroup>
              <Label for="type">Musical Type</Label>
              <Input type="select" name="type" id="type">
                <option>Instrumental</option>
                <option>Vocal</option>
                <option>Both</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="level">Grade Level</Label>
              <Input type="select" name="level" id="level">
                <option>Early Elementary</option>
                <option>Late Elementary</option>
                <option>Middle School</option>
                <option>Early High School</option>
                <option>Late High School</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
              </FormText>
            </FormGroup>

          </Form>
          <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewSongPlan}>Submit</Button>

        </div>
      </>
      );
    }
}

export default withRouter(SongPlanForm)