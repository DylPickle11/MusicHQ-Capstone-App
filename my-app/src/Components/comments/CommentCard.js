import React, { Component } from 'react';
import {Card, CardText } from 'reactstrap';


class CommentCard extends Component {

    render() {
        return (
            <Card>
                {this.props.comment.userId}:{this.props.comment.comment}
            </Card>
        )
    }
}

export default CommentCard