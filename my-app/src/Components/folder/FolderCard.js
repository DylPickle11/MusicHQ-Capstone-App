import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Card, CardSubtitle, CardText, Button, CardHeader} from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css';

class FolderCard extends Component {
    render() {
        return (
            <Card>
                <CardHeader>{this.props.folder.title}</CardHeader>
                <CardText>{this.props.folder.description}</CardText>
                <CardSubtitle>Video</CardSubtitle>
            </Card>
        )
    }
}

export default FolderCard