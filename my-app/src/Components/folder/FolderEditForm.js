import React, { Component } from "react"
import APIManager from './../../Modules/APIManager'
import { Button, Form, FormGroup, Label, Input, Card, CardSubtitle, CardText, CardHeader } from "reactstrap";
import moment from 'moment';


class FolderEditForm extends Component {
    moment = require('moment');
    date = moment().calendar();

    //set the initial state
    state = {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: this.date,
        ifPublic: true,
        loadingStatus: false
      }

    // set state to value of input
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    // update edited task object
    updateFolder = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const editedFolder = {
            id: this.props.match.params.folderId,
            title: this.state.title,
            date: this.state.date,
            ifPublic: true,
            loadingStatus: true
        };
        // push edited task
        APIManager.update("folders", editedFolder)
            .then(() => this.props.history.push("/home"))
    }

    componentDidMount() {
        APIManager.get("folders", this.props.match.params.folderId)
            .then(folder => {
                this.setState({
                    title: folder.title,
                    date: folder.date,
                    ifPublic: true,
                    loadingStatus: false
                });
            });
    }

    // render JSX to be displayed on the DOM
    render() {
        return (
            <>
           <Form onSubmit={this.updateFolder}>
           <h1>Edit Folder Plan</h1>

           <FormGroup>
               <h6>Date updated:{this.state.date}</h6>
           </FormGroup>

           <FormGroup>
              <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleFieldChange} placeholder="place title"/>
           </FormGroup>

           <FormGroup>
              <Label for="ifPublic"> Keep it Public?</Label>
              <Input type="text" name="ifPublic" id="ifPublic" value={this.state.ifPublic} onChange={this.handleFieldChange} placeholder="place url"/>
           </FormGroup>
           </Form>

        <Button type="button" disabled={this.state.loadingStatus} onClick={this.updateFolder}>Submit</Button>
            </>
        );
    }
}
export default FolderEditForm