import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager'
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import moment from 'moment';


class MessageForm extends Component {
    moment = require('moment');
    date = moment().format('LLL');

    //set the initial state
    state= {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: this.date,
        description: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructNewMessage = evt => {
        evt.preventDefault();
            const newMessage = {
                userId: this.state.userId,
                receivedId: this.props.match.params.userId,
                title: this.state.title,
                date: this.state.date,
                description: this.state.description,
                loadingStatus: true
            };

        APIManager.post("messages", newMessage)
          .then(() => this.props.history.push("/friends"))
    }

    render() {
        return (
        <>
        <div>
           <Form>
            <h1>New Message</h1>
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
          </Form>
          <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewMessage}>Submit</Button>

        </div>
      </>
      );
    }
}

export default MessageForm