import React, { Component } from "react";
import APIManager from '../../Modules/APIManager'
import { Card, CardTitle, CardBody, Button} from "reactstrap";
import moment from 'moment';


export default class FriendCard extends Component {
  moment = require('moment');
  date = moment().format('LLL');

  state = {
    loadingStatus: false
  }

  friendRequest = event =>{
    event.preventDefault()
    this.setState({ loadingStatus: true });
    const request = {
        userId: parseInt(this.props.userId),
        receiverId: this.props.user.id,
        ifApproved: false,
        ifPending: true,
        date: this.date
    };
   APIManager.post("friendRequests", request)
   alert('Friend Request Sent')
}
  render() {
    return (
      <div>
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.props.user.userName}</CardTitle>
             <Button className="btn btn-success" disabled={this.state.loadingStatus} onClick={this.friendRequest}>Add</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}