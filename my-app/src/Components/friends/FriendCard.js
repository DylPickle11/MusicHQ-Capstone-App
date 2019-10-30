import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardText,
  CardImg,
  CardBody,
  CardDeck,
  CardSubtitle,
  Button
} from "reactstrap";

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
            <Button>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}