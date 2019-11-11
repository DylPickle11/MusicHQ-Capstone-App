import React, { Component } from 'react';
import {Card, CardText } from 'reactstrap';


class CommentCard extends Component {

    render() {
        return (
                
                <p>{this.props.comment.user.userName}: {this.props.comment.comment}</p>
          
        )
    }
}

export default CommentCard