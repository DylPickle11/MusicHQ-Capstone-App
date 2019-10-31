import React, { Component } from "react";
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";

export default class FriendCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.props.message.title}</CardTitle>
            <CardText>{this.props.message.date}</CardText>
            <CardText>{this.props.message.description}</CardText>
            
            <Button>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}