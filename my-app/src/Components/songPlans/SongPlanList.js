import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import FolderList from '../folder/FolderList';
import SongPlanCard from './SongPlanCard';
import ResultsCard from './results/ResultsCard';
import FolderResultsCard from './results/ResultsCard';
import './SongPlan.css'

class SongPlanList extends Component {
    state = {
        allSongPlans: [],
        allFolderPlans: [],
        searchPlanResults: [],
        searchFolderResults: []
    }

    componentDidMount() {
        APIManager.getUserData("songPlans", this.props.userId ).then((allSongs) =>
          {  this.setState({
                allSongPlans: allSongs
            })
        })
        APIManager.getUserData("folders", this.props.userId ).then((allFolders) =>
          {  this.setState({
                allFolderPlans: allFolders
            })
        })
    }

    // set state to value of input
    handleFieldChange = event => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    deleteSong(id) {
        APIManager.delete("songPlans", id)
            .then(() => {
                APIManager.getUserData("songPlans", this.props.userId).then((allSongs) => {
                    this.setState({
                        allSongs: allSongs
                    })
                })
            })
    }

    search = ()=> {
      const searchInput= document.getElementById("search");
      let inputValue = searchInput.value;
      let songPlanMatches =[];
      let folderMatches =[];
        this.state.allSongPlans.map(songPlan=>{
            if (songPlan.title.toUpperCase().includes(inputValue)) {
                songPlanMatches.push(songPlan)
            }
        })
        this.state.allFolderPlans.map(folderPlan=>{
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
              <h1>Song Plans</h1>
                  <div className="input-container">
                    <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                    <button type="button" disabled={this.state.loadingStatus} onClick={this.search}>Search</button>
                  </div>

                  <div className="main-container">
                    <div className="songPlan-container">
                      <h2>SONGPLANS</h2>
                      <button onClick={() => {this.props.history.push("/songPlans/new")}}>New Post</button>
                    
                      { this.state.allSongPlans.map(song =>
                          <SongPlanCard key={song.id} song={song} deleteSong={this.deleteSong}
                          {...this.props}/>)
                      }
                    </div>

                    <div className='folder-container'>
                      <button onClick={() => {this.props.history.push("/folder/new")}}>New Folder</button>
                        <FolderList {...this.props} />
                    </div>
                  </div>

                    <div className="main-container">
                      <h2>SEARCH RESULTS</h2>

                      {this.state.searchPlanResults.map(result =>
                         <ResultsCard key={result.id} result={result}
                         deleteSong={this.deleteSong}
                         {...this.props}/>)
                      }
                      {this.state.searchFolderResults.map(result =>
                        <FolderResultsCard key={result.id} result={result}
                         deleteSong={this.deleteSong}
                         {...this.props}/>)
                      }
                    </div>
            </>
        )
    }
}

export default withRouter(SongPlanList);