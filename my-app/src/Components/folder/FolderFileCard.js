import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APIManager from '../../Modules/APIManager';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class FolderFileCard extends Component {
    handleDelete = () => {
        //invoke the delete function in APIManger and re-direct to the coffee list.
        this.setState({ loadingStatus: true })
        APIManager.delete('folders', this.props.folder.id)
          .then(() => this.props.history.push("/"))
      }

    render() {
        console.log(this.props)
        return (
            <div className="card">
              <div className="card-body">
               <h5 className="card-title">Title: {this.props.file.songPlan.title}</h5>
               <p className="card-text">Description: {this.props.file.songPlan.description}</p>
               <p className="card-text">{this.props.file.songPlan.date}</p>
               <Link to={`/songPlans/${this.props.file.songPlan.id}`} type="button"><Button className="btn btn-info">Details</Button></Link>
              </div>
            </div>  
                
    
     
        )
    }
}

export default FolderFileCard