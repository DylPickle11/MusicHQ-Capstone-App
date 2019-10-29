import React, { Component } from 'react';
import FolderCard from '../folder/FolderCard';
import { withRouter} from 'react-router-dom';
import APIManager from '../../Modules/APIManager';

class FolderList extends Component {
    state = {
        allFolders: []
    }

    componentDidMount() {
        APIManager.getUserData("folders",this.props.userId).then((allFolders) => {
            this.setState({
                allFolders: allFolders
            })
        })
    }


    deleteFolder(id) {
        APIManager.delete("folders", id)
            .then(() => {
                APIManager.getAll("folders", this.props.userId).then((Folders) => {
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
                        <div key={folder.id}>
                        <FolderCard
                        key={folder.id}
                        folder={folder}
                         deleteFolder={this.deleteFolder}
                         {...this.props}/>
                         </div>
                    )
                }


            </>
        )
    }
}

export default withRouter(FolderList);