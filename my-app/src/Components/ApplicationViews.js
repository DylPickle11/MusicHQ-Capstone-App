import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './auth/Login';
import Home from  './home/Home';
import SongPlanList from './songPlans/SongPlanList';
import SongPlanDetail from './songPlans/SongPlanDetail';
import SongPlanForm from './songPlans/SongPlanForm';



class ApplicationViews extends Component {

  render() {
    return (
      <>
        <Route exact path="/" render={props => {
           return <Login userId={this.props.userId} />
        }} />
         <Route path="/home" render={props => {
           return <Home userId={this.props.userId} {...this.props}/>
        }} />
        <Route exact path="/songPlans/new" render={(props) => {
          return <SongPlanForm {...this.props} />
        }} />
         <Route path="/songPlans" render={(props) => {
          return <SongPlanList {...this.props} />
        }} />
        <Route exact path="/songPlans/:songPlansId(\d+)" render={(props) => {
          return <SongPlanDetail songPlanId={parseInt(props.match.params.songPlansId)} {...props} />
        }} />
      </>
    )
  }
}

export default ApplicationViews;