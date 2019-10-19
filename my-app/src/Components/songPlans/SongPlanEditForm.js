import React, { Component } from "react"
import APIManager from './../../Modules/APIManager'
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class SongPlanEditForm extends Component {
    //set the initial state
    state = {
        userId: "",
        title: "",
        date: "",
        description: "",
        video: "",
        keywordId: "",
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
    updateExistingSongPlan = event => {
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const editedSongPlan = {
            id: this.props.match.params.eventId,
            title: this.state.title,
            date: this.state.date,
            description: this.state.description,
            video: this.state.video,
            keywordId: this.state.keywordId,
            ifPublic: true,
            loadingStatus: true
        };
        // push edited task
        APIManager.update("SongPlans", editedSongPlan)
            .then(() => this.props.history.push("/SongPlans"))
    }

    componentDidMount() {
        APIManager.get("SongPlans", this.props.match.params.SongPlanId)
            .then(SongPlan => {
                this.setState({
                    title: SongPlan.title,
                    date: SongPlan.date,
                    description: SongPlan.description,
                    video: SongPlan.video,
                    keywordId: SongPlan.keywordId,
                    ifPublic: true,
                    loadingStatus: false
                });
            });
    }



    // render JSX to be displayed on the DOM
    render() {
        return (
            <>
           <Form onSubmit={this.updateExistingSongPlan}>
            <h1>New Song Plan</h1>
            <FormGroup>
              <Input type="text" name="title" id="title" value={this.state.title} onChange={this.handleFieldChange} placeholder="place title"/>
            </FormGroup>
            <FormGroup>
               <Label for="date">Date</Label>
               <Input type="date" name="date" id="date" value={this.state.date} onChange={this.handleFieldChange} placeholder="place date"/>
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" id="description"  value={this.state.description} onChange={this.handleFieldChange} placeholder="place url"/>
            </FormGroup>
            <FormGroup>
                <Label for="video">video</Label>
                <Input type="video" name="video" id="video" value={this.state.video} onChange={this.handleFieldChange} placeholder="place location"/>
            </FormGroup>
            <FormGroup>
                <Label for="keywordId">keywordId</Label>
                <Input type="text" name="keywordId" id="keywordId"  value={this.state.keywordId} onChange={this.handleFieldChange} placeholder="place image"/>
            </FormGroup>
            <FormGroup>
                <Label for="ifPublic">Public</Label>
                <Input type="text" name="ifPublic" id="ifPublic" onChange={this.handleFieldChange} placeholder="place url"/>
            </FormGroup>
           </Form>
        <Button type="button" disabled={this.state.loadingStatus} onClick={this.editedSongPlan}>Submit</Button>

            </>
        );
    }
}
export default SongPlanEditForm