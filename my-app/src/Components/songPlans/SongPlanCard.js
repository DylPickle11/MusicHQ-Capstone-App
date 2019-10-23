import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Card, CardSubtitle, CardText, Button, CardHeader} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class SongPlanCard extends Component {

    render() {
        console.log(this.props.song.id)
        return (
            <Card className="songPlan-Card">
                <CardHeader>
                    {this.props.song.title}
                </CardHeader>
                <CardText>{this.props.song.description}</CardText>
                <CardSubtitle>Video</CardSubtitle>
                <CardSubtitle>{this.props.song.keywordId}</CardSubtitle>
                <Link to={`/songPlans/${this.props.song.id}/edit`} type="button"><Button color='primary'>Details</Button></Link>
            </Card>
        )
    }
}

export default SongPlanCard
