import React, { Component } from 'react';
import './Home.css';
//import { withRouter } from "react-router-dom"

class Home extends Component {

    render() {
      return (
        <>
         <h1>Welcome Back</h1>
         <div className="parent-container">
           <div className="friends-container">
            <h2>Most Recent songPlans</h2>
            <p>dsfsdfsdfsdfsdfdsfdsfs
             </p>
            </div>
            <div className="notification-container">
             <h2>Friend Notification</h2>
            </div>
            <div className="folder-container">
             <h2>Folder</h2>
            </div>
            <div className="results-container">
             <h2>Results</h2>
            </div>
         </div>
         <div className="parent-container">
           <h2>Results</h2>
            </div>
  

        </>
      )
    }
  }
  export default Home;