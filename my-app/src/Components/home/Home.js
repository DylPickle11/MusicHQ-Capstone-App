import React, { Component } from 'react';
import SongPlanList from "../songPlans/SongPlanList";
import NavigationBar from '../nav/NavBar';
import FolderList from '../folder/FolderList';
import './Home.css';
//import { withRouter } from "react-router-dom"

class Home extends Component {

    render() {
      return (
        <>
         <NavigationBar userId={this.props.userId} userName={this.props.userName}{...this.props}/>

         <div className='flex-container'>
           <SongPlanList {...this.props}/>
         </div>

         <div className='flex-container'>
           <FolderList {...this.props}/>
         </div>


        </>
      )
    }
  }
  export default Home;