import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";

export default class FriendCard extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">
            <CardText>{this.props.friend.user.userName}</CardText>
            </CardTitle>
            <Link to={`/messages/new/${this.props.friend.user.id}`} type="button"><Button color='primary'>Send Message</Button></Link>
            <Button>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}