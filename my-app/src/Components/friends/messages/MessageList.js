import APIManager from '../../../Modules/APIManager';
import React, { Component } from "react";
import MessageCard from './MessageCard';
import { Button } from 'reactstrap';

//Make message form to send the message possibly a modal
//This should create and object that has the userId and friendId on it


export default class MessageList extends Component {
    state = {
      messages: [],
      message: ""
    };
  
    componentDidMount() {
      APIManager.getUserData('messages',this.props.userId)
      .then((messages)=>
        this.setState({
            messages : messages
        })
      )}

    render() {
      return (
        <>
          <div className="md-form active-purple active-purple-2 mb-3">
                <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                <Button type="button" /*disabled={this.state.loadingStatus} onClick={this.search}*/>Search</Button>
          </div>

          <div>
              <h1>Messages</h1>
            {this.state.messages.map(message => (
              <MessageCard key={message.id} message={message} {...this.props} />
            ))}

          </div>
        </>
      );
    }
  }