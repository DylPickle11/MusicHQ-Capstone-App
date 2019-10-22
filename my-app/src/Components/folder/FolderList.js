import React, { Component } from 'react';
import FolderCard from '../folder/FolderCard';
import { Route, withRouter} from 'react-router-dom';
import APIManager from '../../Modules/APIManager';

class FolderList extends Component {
    state = {
        allFolders: []
    }

    componentDidMount() {
        APIManager.getAll("folders").then((allFolders) => {
            this.setState({
                allFolders: allFolders
            })
        })
    }

    deleteFolder(id) {
        APIManager.delete("folders", id)
            .then(() => {
                APIManager.getAll("folders").then((Folders) => {
                    this.setState({
                        allFolders: Folders
                    })
                })
            })
    }


    render() {
        return (
            <>
                <h1>Folder</h1>
                {
                    this.state.allFolders.map(folder =>
                        <FolderCard
                        key={folder.id}
                        folder={folder}
                         deleteFolder={this.deleteFolder}
                         {...this.props}/>
                    )
                }
            </>
        )
    }
}

export default withRouter(FolderList);