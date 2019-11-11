import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';
import './Form.css'

class FolderForm extends Component {
    //set the initial state
    state= {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: "",
        ifPublic: true,
        loadingStatus: false
    }
    moment = require('moment');
    date = moment().format('LLL');

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructFolder = evt => {
      console.log(this.state.userId)
        evt.preventDefault();
            const newFolder = {
                userId: parseInt(this.state.userId),
                title: this.state.title,
                date: this.state.date,
                ifPublic: true,
                loadingStatus: true
            }

        APIManager.post("folders", newFolder)
            .then(()=> this.props.history.push("/folders"))
    }

    render() {

      return (
        <>
        <div className='form'>
           <Form>
            <h1>New Folder</h1>
            <FormGroup>
              <Label for="date">Title</Label>
              <Input type="text" className="input"name="title" id="title" onChange={this.handleFieldChange} placeholder="place title"/>
            </FormGroup>

            <FormGroup>
               <Label for="date">Date</Label>
               <Input type="text" name="date" className="input" id="date" value={this.date} onChange={this.handleFieldChange} placeholder="place date"/>
            </FormGroup>
            <Button type="button" className="btn btn-success" disabled={this.state.loadingStatus} onClick={this.constructFolder}>Submit</Button>
          </Form>
        </div>
      </>
      );
    }
}

export default FolderForm;