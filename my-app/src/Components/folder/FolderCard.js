import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager';
import {Card, CardText, Button, CardHeader} from 'reactstrap';
import {FaRegTrashAlt, FaRegEdit } from "react-icons/fa"
//import 'bootstrap/dist/css/bootstrap.min.css';

class FolderCard extends Component {
    handleDelete = () => {
        //invoke the delete function in APIManger and re-direct to the coffee list.
        this.setState({ loadingStatus: true })
        APIManager.delete('folders', this.props.folder.id)
          .then(() => this.props.history.push("/songPlans"))
      }

    render() {
        return (
            <Card>
                <CardHeader>{this.props.folder.title}</CardHeader>
                <CardText>{this.props.folder.date}</CardText>
                <CardText>{this.props.folder.ifPublic}</CardText>
                <Button onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/files`) }}>Open Folder</Button>
                <Button type="button" onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/edit`) }}><FaRegEdit/></Button>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}><FaRegTrashAlt/></Button>
            </Card>
        )
    }
}

export default FolderCard