import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Card, CardSubtitle, CardText, Button, CardHeader} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class FolderCard extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    {this.props.song.title}
                </CardHeader>
                <CardText>{this.props.song.description}</CardText>
                <CardSubtitle>Video</CardSubtitle>
                <CardSubtitle>{this.props.song.keywordId}</CardSubtitle>
                <Link className="navLink" to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>Details</Button></Link>
            </Card>
        )
    }
}

export default FolderCard