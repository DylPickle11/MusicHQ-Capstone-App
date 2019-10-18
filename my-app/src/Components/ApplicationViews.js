import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './auth/Login';
import Home from  './home/Home';

import SongPlanDetail from './songPlans/SongPlanDetail'


class ApplicationViews extends Component {

  render() {
    return (
      <>
        <Route path="/" render={props => {
           return <Login userId={this.props.userId} />
        }} />
         <Route path="/home" render={props => {
           return <Home userId={this.props.userId} />
        }} />

        <Route exact path="/songPlans/:songPlansId(\d+)" render={(props) => {
          return <SongPlanDetail songPlanId={parseInt(props.match.params.songPlansId)} {...props} />
        }} />
      </>
    )
  }
}

export default ApplicationViews;