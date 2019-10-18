import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './auth/Login';
import Home from  './home/Home';
//import OrderView from "./views/OrderView";

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
      </>
    )
  }
}

export default ApplicationViews;