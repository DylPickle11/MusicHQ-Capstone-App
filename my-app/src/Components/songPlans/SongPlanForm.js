import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager';
import {Form, FormGroup, Label, Input, Button } from 'reactstrap';

class SongPlanForm extends Component {
    //set the initial state
    state= {
        userId: "",
        title: "",
        date: "",
        description: "",
        video: "",
        keywordId: "",
        ifPublic: true,
        loadingStatus: true
    }

    handleFieldChange = evt => {
      const stateToChange = {}
      stateToChange[evt.target.id] = evt.target.value
      this.setState(stateToChange)
    }

    constructNewSongPlan = evt => {
        evt.preventDefault();
        this.setState({ loadingStatus: true });
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
              <Input type="text" name="title" id="title" onChange={this.handleFieldChange} placeholder="place title"/>
            </FormGroup>
            <FormGroup>
               <Label for="date">Date</Label>
               <Input type="date" name="date" id="date" onChange={this.handleFieldChange} placeholder="place date"/>
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" id="description" onChange={this.handleFieldChange} placeholder="place url"/>
            </FormGroup>
            <FormGroup>
                <Label for="video">video</Label>
                <Input type="video" name="video" id="video" onChange={this.handleFieldChange} placeholder="place location"/>
            </FormGroup>
            <FormGroup>
                <Label for="keywordId">keywordId</Label>
                <Input type="text" name="keywordId" id="keywordId" onChange={this.handleFieldChange} placeholder="place image"/>
            </FormGroup>
            <FormGroup>
                <Label for="ifPublic">Public</Label>
                <Input type="text" name="ifPublic" id="ifPublic" onChange={this.handleFieldChange} placeholder="place url"/>
            </FormGroup>
           </Form>
        <Button type="button" disabled={this.state.loadingStatus} onClick={this.constructNewSongPlan}>Submit</Button>

    </div>
        </>
      );
    }
}

export default SongPlanForm