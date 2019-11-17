import APIManager from '../../Modules/APIManager';
import React, { Component } from "react";
import FriendCard from './FriendCard';
import UserCard from './UserCard';
import RequestCard from './RequestCard';
import {Modal, ModalBody, ModalFooter, ModalHeader, Input, Form, FormGroup, Button, Label} from 'reactstrap';
import '../songPlans/SongPlan.css'

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
    let unfriends = [];
    APIManager.getAll("users")
        .then((users)=>{
          users.map(user =>{
            this.state.friends.map(friend=>{
              if(user.id !== friend.user.id && user.id !== friend.currentUserId) {
                 unfriends.push(user)
              }
           })
          })
          this.setState({
            users: unfriends
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
      return (
        <>
          <div className="main-container">
            <div className="songPlan-container">
              <h2>All Friends</h2>
              <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
              <Button type="button" /*disabled={this.state.loadingStatus}*/ onClick={this.searchUserFriends}>Search</Button>
              {this.state.friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} {...this.props} />
              ))}
            </div>

            <div className="folder-container">
             <h2>Friend Requests </h2>
             {this.state.requests.map(request => (
              <RequestCard key={request.id} request={request} {...this.props} />
              ))} 
            </div>

            <div>
              <h2>Soon to Be friends</h2>
             {this.state.users.map(user => (
              <UserCard key={user.id} user={user} {...this.props} />
              ))}
            </div>

              {/* <div>
              <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                   <Button type="button" disabled={this.state.loadingStatus} onClick={this.searchAllFriends}>Add Friends</Button>
              </div>      */}

          </div>

        </>
      );
    }
  }