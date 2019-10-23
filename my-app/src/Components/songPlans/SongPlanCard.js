import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Card, CardSubtitle, CardText, Button, CardHeader} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class SongPlanCard extends Component {

    render() {
        return (
            <Card className="songPlan-Card">
                <CardHeader>{this.props.song.title}</CardHeader>
                <CardText>{this.props.song.description}</CardText>
                <CardSubtitle>{this.props.song.date}</CardSubtitle>
                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>Details</Button></Link>
            </Card>
        )
    }
}

export default SongPlanCard
