import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager';
import {Card, CardText, CardHeader, CardSubtitle} from 'reactstrap';
//import {FaRegTrashAlt, FaRegEdit } from "react-icons/fa"
import 'bootstrap/dist/css/bootstrap.min.css';

class FolderFileCard extends Component {
    handleDelete = () => {
        //invoke the delete function in APIManger and re-direct to the coffee list.
        this.setState({ loadingStatus: true })
        APIManager.delete('folders', this.props.folder.id)
          .then(() => this.props.history.push("/home"))
      }

    render() {
        return (
            <Card>
                <CardHeader>Hello:{this.props.file.title}</CardHeader>
                <CardSubtitle>{this.props.file.date}</CardSubtitle>
                <CardText>{this.props.file.description}</CardText>
     {/*
                <Link to={`/songPlans/${this.props.song.id}`} type="button"><Button color='primary'>Details</Button></Link>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}><FaRegTrashAlt/></Button>
     */}
       </Card>
        )
    }
}

export default FolderFileCard