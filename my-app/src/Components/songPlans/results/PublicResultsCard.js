import React, { Component } from 'react';
import {Card, CardText, CardHeader} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class PublicResultsCard extends Component {


    render() {
        return (
            <Card>
                <CardHeader>{this.props.planResults.title}</CardHeader>
                <CardText>{this.props.planResults.date}</CardText>
                <CardText>{this.props.planResults.ifPublic}</CardText>
                {/* <Button onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/files`) }}>Open Folder</Button>
                <Button type="button" onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/edit`) }}><FaRegEdit/></Button>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}><FaRegTrashAlt/></Button> */}
            </Card>
        )
    }
}

export default PublicResultsCard