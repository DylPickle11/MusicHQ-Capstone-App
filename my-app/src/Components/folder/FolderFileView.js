import React, { Component } from 'react';
import FolderFileCard from './FolderFileCard';
import APIManager from '../../Modules/APIManager';
//
class FolderFileView extends Component {
    state = {
        allFiles: []
    }

    componentDidMount() {
         APIManager.getExpand("folderPlans",this.props.match.params.folderId).then((files) => {
             this.setState({allFiles: files})
            })
    }

    render() {
       console.log(this.state.allFiles)
    return (
        <>
        <h1>Files</h1>
        {
            this.state.allFiles.map(file =>
                <FolderFileCard
                key={file.id}
                file={file}
                // deleteFile={this.deleteFile}
                 {...this.props}/>
            )
        }
    </>
    )
    }
}

export default FolderFileView;