import React, { Component } from 'react';
import APIManager from '../Modules/APIManager';
import {Card, Button} from 'reactstrap';

class SearchCard extends Component {
    saveToUser = () =>{
        // Create new Object
        const songForUser = {
                userId: this.props.userId,
                title: this.props.publicPlan.title,
                date: this.props.publicPlan.date,
                description: this.props.publicPlan.description,
                type: this.props.publicPlan.type,
                levelOption: this.props.publicPlan.level,
                comment: this.props.publicPlan.comment,
                ifPublic: this.props.publicPlan.ifPublicChoice,
                loadingStatus: true
        } 
         APIManager.post("songPlans", songForUser)
        alert('Saved to your Song Plan') 
        
    }

    render() {
        return (
            <Card className="card">
              <div className="card-body">
                <h5 className="card-title">Title: {this.props.publicPlan.title}</h5>
                <p className="card-text">Description: {this.props.publicPlan.description}</p>
                <p className="card-text">{this.props.publicPlan.date}</p>
                <p className="card-text">Level: {this.props.publicPlan.levelOption}</p>
                <p className="card-text">Public: {this.props.publicPlan.type}</p>
                <Button type="button" className="btn btn-success" onClick={this.saveToUser}>Save to User</Button>
               </div> 
            </Card>
        )
    }
}

export default SearchCard