import React, { Component } from 'react';
import './Comment.css'

class CommentCard extends Component {

    render() {
        return (

                <p className="comments"><span className="color">{this.props.comment.user.userName}</span>: {this.props.comment.comment}</p>

        )
    }
}

export default CommentCard