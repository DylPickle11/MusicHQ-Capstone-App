import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";

export default class FriendCard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">
            <CardText>{this.props.friend.friend.friendName}</CardText>
            <CardText>{this.props.friend.friend.friendUserName}</CardText>
            </CardTitle>
            <Link to={`/messages/new`} type="button"><Button color='primary'>Send Message</Button></Link>
            <Button>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}