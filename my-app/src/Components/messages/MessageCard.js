import React, { Component} from "react";
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";

export default class MessageCard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Card>
          <CardBody className="cardBody">
            <CardTitle className="cardTitle">{this.props.message.title}</CardTitle>
            <CardText>{this.props.message.date}</CardText>
            <CardText>{this.props.message.description}</CardText>
            <Link to={`/messages/new/${this.props.message.userId}`}type="button"><Button color='primary'>Send Message</Button></Link>
            <Button>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}