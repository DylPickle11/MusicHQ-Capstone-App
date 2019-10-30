import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './auth/Login';
import Home from  './home/Home';
import SongPlanList from './songPlans/SongPlanList';
import SongPlanDetail from './songPlans/SongPlanDetail';
import SongPlanForm from './songPlans/SongPlanForm';
import SongPlanEditForm from './songPlans/SongPlanEditForm';
import FolderForm from './folder/FolderForm';
import FolderEditForm from './folder/FolderEditForm';
import FolderFileView from './folder/FolderFileView';
import SearchList from '../search/SearchList';
import FriendList from './friends/FriendList';
import MessageForm from './friends/messages/MessageForm';
import MessageList from './friends/messages/MessageList';



class ApplicationViews extends Component {

  render() {

    return (
      <>
         <Route exact path="/" render={props => {
           return <Home userId={this.props.userId} userName={this.props.userName} handleLogout={this.handleLogout} {...this.props}/>
        }} />
        <Route exact path="/Login" render={(props) => {
          return <Login {...this.props} />
        }} />

        <Route exact path="/folder/new" render={(props) => {
          return <FolderForm {...props} />
        }} />
        <Route exact path="/folder/:folderId(\d+)/edit" render={props => {
          return <FolderEditForm {...props} />
        }} />
        <Route exact path="/folder/:folderId(\d+)/files" render={props => {
          return <FolderFileView {...props} />
        }} />

        <Route exact path="/songPlans/new" render={(props) => {
          return <SongPlanForm {...props} />
        }} />
         <Route exact path="/songPlans" render={(props) => {
          return <SongPlanList {...this.props} />
        }} />
        <Route exact path="/songPlans/:songPlansId(\d+)" render={(props) => {
          return <SongPlanDetail songPlanId={parseInt(props.match.params.songPlansId)} {...props} />
        }} />
         <Route exact path="/songPlans/:songPlanId(\d+)/edit" render={props => {
          return <SongPlanEditForm {...props} />
        }} />
         <Route exact path="/search" render={(props) => {
          return <SearchList {...this.props} />
        }} />
        <Route exact path="/friends" render={(props) => {
          return <FriendList userId={this.props.userId} userName={this.props.userName} {...this.props} />
        }} />
        <Route exact path="/messages" render={(props) => {
          return <MessageList userId={this.props.userId} userName={this.props.userName} {...this.props} />
        }} />
         <Route exact path="/messages/new/:userId(\d+)" render={(props) => {
          return <MessageForm userId={this.props.userId} userName={this.props.userName} {...this.props} {...props} />
        }} />

      </>
    )
  }
}

export default ApplicationViews;