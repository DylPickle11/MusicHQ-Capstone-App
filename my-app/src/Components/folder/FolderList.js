import React, { Component } from 'react';
import FolderCard from '../folder/FolderCard';
import { withRouter} from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import FolderResultsCard from '../songPlans/results/FolderResultsCard';
import '../songPlans/SongPlan.css'

class FolderList extends Component {
    state = {
        allFolders: [],
        searchFolderResults: []
    }

    componentDidMount() {
        APIManager.getUserData("folders", this.props.userId).then((allFolders) => {
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

    searchFolder = ()=> {
        const searchInput= document.getElementById("search");
        let inputValue = searchInput.value;
        let folderMatches =[];
          this.state.allFolders.map(folderPlan=>{
              if (folderPlan.title.toUpperCase().includes(inputValue)) {
                  folderMatches.push(folderPlan)
              }
          })
          this.setState({
              searchFolderResults: folderMatches
          })
      }


    render() {
        return (
            <>
              <h1>Folders</h1>
                <div className="input-container">
                  <input id="search" className="form-control search" type="text" placeholder="Search"  aria-label="Search" onChange={this.handleFieldChange}/>
                  <button type="button" disabled={this.state.loadingStatus} onClick={this.searchFolder}>Search</button>
                </div>

                <div className="main-container">
                  <div className="songPlan-container">
                  <button onClick={() => {this.props.history.push("/folder/new")}}>New Folder</button>
                  { this.state.allFolders.map(folder =>
                   <FolderCard key={folder.id} folder={folder} deleteFolder={this.deleteFolder} {...this.props}/>
                    )
                  }
                </div>

                <div className='folder-container'>
                  <h2>SEARCH RESULTS</h2>
                  {this.state.searchFolderResults.map(result =>
                        <FolderResultsCard key={result.id} result={result}
                         deleteSong={this.deleteSong}
                         {...this.props}/>)
                  }
                </div>
              </div>

            </>
        )
    }
}

export default withRouter(FolderList);