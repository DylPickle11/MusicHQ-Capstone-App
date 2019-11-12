import React, { Component } from 'react';
import APIManager from '../../../Modules/AuthManager';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ResultsCard extends Component {
    handleDelete = () => {
        //invoke the delete function in APIManger and re-direct to the coffee list.
        this.setState({ loadingStatus: true })
        APIManager.delete('folders', this.props.folder.id)
          .then(() => this.props.history.push("/"))
      }

    render() {
        return (
            <div className="card">
             <div className="card-body">
                <h5 className="card-title">{this.props.result.title}</h5>
                <p className="card-text">{this.props.result.date}</p>
                <p className="card-text">{this.props.result.ifPublic}</p>
                <Button onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/files`) }}>Open Folder</Button>
                <Button type="button" onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/edit`) }}>Edit</Button>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}>Delete></Button>
             </div>
            </div>
        )
    }
}

export default ResultsCard