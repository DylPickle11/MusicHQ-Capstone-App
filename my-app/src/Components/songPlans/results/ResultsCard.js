import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';
//import {FaRegTrashAlt } from "react-icons/fa"

class ResultsCard extends Component {

    render() {
        return (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Title:{this.props.result.title}</h5>
                <p className="card-text">Description: {this.props.result.description}</p>
                <p className="card-text">{this.props.result.date}</p>
                </div>
                <Link to={`/songPlans/${this.props.result.id}`} type="button"><Button color='primary'>Details</Button></Link>
            </div>

              )
    }
}

export default ResultsCard
