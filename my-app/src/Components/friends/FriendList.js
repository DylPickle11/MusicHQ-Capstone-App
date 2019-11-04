import APIManager from '../../Modules/APIManager';
import React, { Component } from "react";
import FriendCard from './FriendCard';
import MessageList from './messages/MessageList';
import RequestCard from './messages/RequestCard';
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button, Label} from 'reactstrap';

//Make message form to send the message possibly a modal
//This should create and object that has the userId and friendId on it


export default class FriendList extends Component {
    state = {
      friends: [],
      friend: "",
      requests: [],
      users: [],
      allUserFriendMatches: [],
      allPossibleFriends: [],
      modal: true
    };

    toggle = () => {
      this.setState(prevState => ({
          modal: !prevState.modal
  }));

  }

  searchAllFriends = () =>{
    let search = document.getElementById('search');
    let searchResults = search.value;
    let allMatches = [];
    APIManager.getAll('users')
    .then((allUsers)=> {
       allUsers.map(user =>{
         console.log(user.userName)
        if (user.userName === searchResults) {
               allMatches.push(user.userName)
        } else {
         // alert('No User found!')
        }

      })
     }).then(()=>{
       this.setState({
         allPossibleFriends: allMatches
       })
     }) 
  }

  searchUserFriends = () =>{
    let search = document.getElementById('search');
    let searchResults = search.value;
    let allMatches = []
    APIManager.getFriends(this.props.userId)
    .then ((userFriends)=> {
      console.log(userFriends)
      userFriends.map(userFriend=>{
        if (userFriend.userName === searchResults) {
               allMatches.push(userFriend.userName)
        } else {
         // alert('No User found!')
        }

      })
     }).then(()=>{
       this.setState({
         allUserFriendMatches: allMatches
       })
     })
  }

    componentDidMount() {
    APIManager.getFriends(this.props.userId)
         .then((friends)=>{
        this.setState({
            friends : friends
         })
        })
    APIManager.getAll("users")
        .then((users)=>{
       this.setState({
           users: users
        })
       })
    APIManager.getFriendRequests(this.props.userId)
       .then((requests)=>{
        this.setState({
          requests: requests
       })
      })


    }

    render() {
      console.log(this.state.requests)
      return (
        <>
          <div className="md-form active-purple active-purple-2 mb-3">
          <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                   <Button type="button" /*disabled={this.state.loadingStatus}*/ onClick={this.searchUserFriends}>Search</Button>
                   <Button type="button" /*disabled={this.state.loadingStatus}*/ onClick={this.searchAllFriends}>Add Friends</Button>
          </div>
          {/* <div>
          <h1>Your Friends Results</h1>
           {this.state.friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} {...this.props} />
            ))} 
          </div> */}
          <div>
          <h1>Friend Requests </h1>
           {this.state.requests.map(request => (
              <RequestCard key={request.id} request={request} {...this.props} />
            ))} 
          </div>
          <div>
              <h1>All Friends</h1>
            {this.state.users.map(user => (
              <FriendCard key={user.id} user={user} {...this.props} />
            ))}
          </div>
          
          <div>
             <MessageList {...this.props} />
          </div>
        </>
      );
    }
  }