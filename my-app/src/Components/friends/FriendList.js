import APIManager from '../../Modules/APIManager';
import React, { Component } from "react";
import FriendCard from './FriendCard';

export default class FriendList extends Component {
    state = {
      friends: [],
      friend: ""
    };
  
    componentDidMount() {
      APIManager.getFriends(this.props.userId)
      .then((friends)=>
        this.setState({
            friends : friends
        })
      )}

    render() {
      return (
        <>
          <div>
              <h1>Friends</h1>
            {this.state.friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} {...this.props} />
            ))}

          </div>
        </>
      );
    }
  }