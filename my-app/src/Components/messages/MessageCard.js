import React, { Component} from "react";
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardText, CardBody, Button} from "reactstrap";
import APIManager from '../../Modules/APIManager';

export default class MessageCard extends Component {
  handleDelete = () => {
    this.setState({ loadingStatus: true })
    APIManager.delete('messages', this.props.message.id)
  }

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
            <Button onClick={this.handleDelete}>Remove</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}