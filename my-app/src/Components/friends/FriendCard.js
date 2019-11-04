import React, { Component } from "react";
import { Link } from 'react-router-dom';
import APIManager from '../../Modules/APIManager'
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";
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
   alert('Friend Request sent')
}
  render() {

    return (
      <div>
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">
            <CardText>{this.props.user.userName}</CardText>
            </CardTitle>
            <Link to={`/messages/new/${this.props.user.id}`} type="button"><Button color='primary'>Send Message</Button></Link>
            <Button disabled={this.state.loadingStatus} onClick={this.friendRequest}>Add</Button>
            <Button>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}