import React, { Component } from 'react';
import { Card, CardText, Button, CardSubtitle, CardHeader } from 'reactstrap';
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
                <Button className="song-btns" color="primary">Details</Button>
                <Button className="song-btns" color="danger">Delete</Button>
            </Card>
        )
    }
}

export default SongPlanCard
