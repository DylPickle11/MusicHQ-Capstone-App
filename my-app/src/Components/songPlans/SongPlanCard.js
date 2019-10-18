import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, Row, CardText, Button, CardHeader} from 'reactstrap';
import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class SongPlanCard extends Component {
    render() {
        return (
            <Card className="songPlan-Card">
                <CardHeader>
                    {this.props.song.title}
                </CardHeader>
                <CardText>{this.props.song.description}</CardText>
                <CardSubtitle>Video</CardSubtitle>
                <CardSubtitle>{this.props.song.keywordId}</CardSubtitle>
                <Link className="navLink" to={`/songPlans/${this.props.song.id}`} type="button"><Button>Details</Button></Link>
                <Button className="song-btns" color="primary">Details</Button>
            </Card>
        )
    }
}

export default SongPlanCard
