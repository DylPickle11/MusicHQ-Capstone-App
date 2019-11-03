import React, { Component } from 'react';
import { Link } from "react-router-dom";
//import '../../bootstrap.min.css'
import {Card, CardSubtitle, CardText,CardHeader, Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button, Label} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class ResultsCard extends Component {

    render() {
        console.log(this.props.result)
        return (
            <Card className="songPlan-Card">
                <CardHeader>Title:{this.props.result.title}</CardHeader>
                <CardText>description:{this.props.result.description}</CardText>
                <CardSubtitle>{this.props.result.date}</CardSubtitle>
                <CardSubtitle>Comment:{this.props.result.comment}</CardSubtitle>
                <Link to={`/songPlans/${this.props.result.id}`} type="button"><Button color='primary'>Details</Button></Link>
            </Card>

              )
    }
}

export default ResultsCard
