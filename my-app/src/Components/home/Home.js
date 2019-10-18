import React, { Component } from 'react';
import SongPlanList from "../songPlans/SongPlanList";
//import { withRouter } from "react-router-dom"

class Home extends Component {

    render() {
      return (
        <>
         <SongPlanList {...this.props}/>
        </>
      )
    }
  }
  export default Home;