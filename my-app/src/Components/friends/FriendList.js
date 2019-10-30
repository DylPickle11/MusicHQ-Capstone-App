import APIManager from '../../Modules/APIManager';
import React, { Component } from "react";
import FriendCard from './FriendCard';
import MessageList from './messages/MessageList';
import { Button } from 'reactstrap';

//Make message form to send the message possibly a modal
//This should create and object that has the userId and friendId on it


export default class FriendList extends Component {
    state = {
      friends: [],
      friend: ""
    };

    componentDidMount() {
    APIManager.getFriends(this.props.userId)
         .then((friends)=>{
        this.setState({
            friends : friends,
         })
        })
    }

    render() {
      return (
        <>
          <div className="md-form active-purple active-purple-2 mb-3">
                <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                <Button type="button" /*disabled={this.state.loadingStatus} onClick={this.search}*/>Search</Button>
          </div>

          <div>
              <h1>Friends</h1>
            {this.state.friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} {...this.props} />
            ))}

          </div>
          <div>
             <MessageList {...this.props} />

          </div>
        </>
      );
    }
  }