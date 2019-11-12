import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager';
import { Button } from 'reactstrap';

class FolderCard extends Component {
    handleDelete = () => {
        //invoke the delete function in APIManger and re-direct to the coffee list.
        this.setState({ loadingStatus: true })
        APIManager.delete('folders', this.props.folder.id)
          .then(() => this.props.history.push("/songplans"))
      }

    render() {
        return (
            <div className="card">
             <div className="card-body">
                <h5 className="card-title">{this.props.folder.title}</h5>
                <p className="card-text">{this.props.folder.date}</p>
                <p className="card-text">{this.props.folder.ifPublic}</p>
                <Button onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/files`) }}>Open Folder</Button>
                <Button type="button" onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/edit`) }}>Edit</Button>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}>Delete</Button>
             </div>
            </div>
        )
    }
}

export default FolderCard