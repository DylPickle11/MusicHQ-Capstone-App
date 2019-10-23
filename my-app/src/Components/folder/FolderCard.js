import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from '../../Modules/APIManager';
import {Card, CardSubtitle, CardText, Button, CardHeader} from 'reactstrap';
import {FaRegTrashAlt, FaRegEdit } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css';

class FolderCard extends Component {
    handleDelete = () => {
        //invoke the delete function in APIManger and re-direct to the coffee list.
        this.setState({ loadingStatus: true })
        APIManager.delete('folders', this.props.folder.id)
          .then(() => this.props.history.push("/home"))
      }

    render() {
        return (
            <Card>
                <CardHeader>{this.props.folder.title}</CardHeader>
                <CardText>{this.props.folder.description}</CardText>
                <CardSubtitle>Video</CardSubtitle>
                <Button type="button" onClick={() => { this.props.history.push(`/folders/${this.props.folderId}/edit`) }}><FaRegEdit/></Button>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}><FaRegTrashAlt/></Button>
            </Card>
        )
    }
}

export default FolderCard