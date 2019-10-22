import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button, FormText, } from 'reactstrap';

class FolderForm extends Component {
    //set the initial state
    state= {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: "",
        description: "",
        ifPublic: true,
        loadingStatus: false
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructFolder = evt => {
        evt.preventDefault();
            const newFolder = {
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                ifPublic: true,
                loadingStatus: true
            };

        APIManager.post("folders", newFolder)
          .then(() => this.props.history.push("/home"))
    }

    render() {

      return (
        <>
        <div>
           <Form>
            <h1>New Folder</h1>
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
          </Form>
          <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructFolder}>Submit</Button>

        </div>
      </>
      );
    }
}

export default withRouter(FolderForm)