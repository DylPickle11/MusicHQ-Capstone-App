import React, { Component } from "react"
import APIManager from './../../Modules/APIManager'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import moment from 'moment';
import '../folder/Form.css'

class SongPlanEditForm extends Component {
    moment = require('moment');
    date = moment().calendar();

    //set the initial state
    state = {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: this.date,
        description: "",
        type: "",
        levelOption: "",
        ifPublic: [],
        ifPublic:"",
        comment:"",
        videoURL:'',
        loadingStatus: false
      }

    // set state to value of input
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    // update edited task object
    updateSongPlan = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const editedSongPlan = {
            id: parseInt(this.props.match.params.songPlanId),
            userId: parseInt(this.state.userId),
            title: this.state.title,
            date: this.state.date,
            description: this.state.description,
            type: this.state.type,
            levelOption: this.state.levelOption,
            comment: this.state.comment,
            ifPublic: this.state.ifPublic,
            videoURL: this.state.videoURL,
            loadingStatus: true
        };
        // push edited task
        APIManager.update("songPlans", editedSongPlan)
            .then(() => this.props.history.push("/songplans"))
    }

    componentDidMount() {
        APIManager.get("songPlans", this.props.match.params.songPlanId)
            .then(SongPlan => {
                this.setState({
                    title: SongPlan.title,
                    date: SongPlan.date,
                    description: SongPlan.description,
                    type: SongPlan.type,
                    levelOption: SongPlan.levelOption,
                    ifPublic: SongPlan.ifPublic,
                    videoURL: SongPlan.videoURL,
                    loadingStatus: false
                });
            });
    }



    // render JSX to be displayed on the DOM
    render() {
      console.log(this.state)
        return (
            <>
           <Form className="Form" onSubmit={this.updateSongPlan}>
            <h1>Edit Song Plan</h1>
            <FormGroup>
               <h6>Date updated:{this.state.date}</h6>
            </FormGroup>

            <FormGroup>
              <Input className="input2" type="text" name="title" id="title" value={this.state.title} onChange={this.handleFieldChange} placeholder="place title"/>
            </FormGroup>

            <FormGroup>
                <Label for="description">Description</Label>
                <Input className="input2" type="text" name="description" id="description" value={this.state.description} onChange={this.handleFieldChange} placeholder="place url"/>
            </FormGroup>

            <FormGroup>
              <Label for="type">Musical Type</Label>
              <Input className="input2" type="select" name="type" id="type" onChange={this.handleFieldChange}>
                <option>Instrumental</option>
                <option>Vocal</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="level">Grade Level</Label>
              <Input className="input2" type="select" name="level" id="level" value={this.state.levelOption} onChange={this.handleFieldChange}>
                <option value="1">Early Elementary</option>
                <option value="2">Late Elementary</option>
                <option value="3">Middle School</option>
                <option value="4">Early High School</option>
                <option value="5">Late High School</option>
              </Input>
            </FormGroup>

            <FormGroup value={this.state.ifPublic} onChange={this.handleFieldChange}>
              <legend>Would you like this to be Public?</legend>

            <FormGroup >
              <Label check>
              <Input type="radio" name="radio1" id="ifPublicChoice" onChange={this.handleFieldChange}/>{' '}
              Please make it Public!
              </Label>
            </FormGroup>

            <FormGroup >
              <Label check>
              <Input  type="radio" name="radio1" id="ifPublicChoice" onChange={this.handleFieldChange} />{' '}
              Keep it Private!
              </Label>
           </FormGroup>

          </FormGroup>

          <Button type="button" disabled={this.state.loadingStatus} onClick={this.updateSongPlan}>Submit</Button>
          </Form>


            </>
        );
    }
}
export default SongPlanEditForm