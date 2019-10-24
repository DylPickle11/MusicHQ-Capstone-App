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



class ApplicationViews extends Component {

  render() {
    return (
      <>
         <Route path="/home" render={props => {
           return <Home userId={this.props.userId} {...this.props}/>
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
      </>
    )
  }
}

export default ApplicationViews;