import React, { Component } from 'react';
import SongPlanList from "../songPlans/SongPlanList";
import NavigationBar from '../nav/NavBar';
//import { withRouter } from "react-router-dom"

class Home extends Component {

    render() {
      return (
        <>
         <NavigationBar {...this.props}/>
         <div>
         <SongPlanList {...this.props}/>
         </div>

        </>
      )
    }
  }
  export default Home;