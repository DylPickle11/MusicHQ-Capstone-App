import React, { Component } from 'react';
import {Card, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PublicResultsCard extends Component {


    render() {
        return (
            <Card className="card">
              <div className="card-body">
                <h5 className="card-title">Title: {this.props.planResults.title}</h5>
                <p className="card-text">Description: {this.props.planResults.description}</p>
                <p className="card-text">{this.props.planResults.date}</p>
                <p className="card-text">Level: {this.props.planResults.levelOption}</p>
                <p className="card-text">Public: {this.props.planResults.type}</p>
              <Button type="button" className="btn btn-success" onClick={this.saveToUser}>Save to User</Button>
             </div>
          </Card>
        )
    }
}

export default PublicResultsCard