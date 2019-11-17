import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";
import APIManager from '../../Modules/APIManager'

export default class RequestCard extends Component {
    state = {
        loadingStatus: false
      }
    
      approve = event =>{
        event.preventDefault()
        this.setState({ loadingStatus: true });
        const friendShip = {
            currentUserId: parseInt(this.props.request.userId),
            userId: parseInt(this.props.userId)
        };
        
       APIManager.post("friendShips", friendShip)
       APIManager.delete("friendRequests", this.props.request.id)
       alert('Friend Made')
    }

    disapprove = event =>{
        alert('Are you sure you wish to Delete?')
        event.preventDefault()
        this.setState({ loadingStatus: true });
       APIManager.delete("friendRequests", this.props.request.id)
       alert('Friend Request Removed')
    }

  render() {
    return (
      <div>
        
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">Friend Request</CardTitle>
            <CardText>Request From: {this.props.request.user.userName}</CardText>
            <CardText>Would you like to be my friend?</CardText>
            <Button onClick={this.approve}>Approve</Button>
            <Button onClick={this.disapprove}>Disappove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}