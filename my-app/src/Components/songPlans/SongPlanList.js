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
        searchPlanResults: []
    }

    componentDidMount() {
        APIManager.getUserData("songPlans", this.props.userId ).then((allSongs) =>
          {  this.setState({
                allSongPlans: allSongs
            })
        })
        // APIManager.getUserData("folders", this.props.userId ).then((allFolders) =>
        //   {  this.setState({
        //         allFolderPlans: allFolders
        //     })
        // })
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
        this.state.allSongPlans.map(songPlan=>{
            if (songPlan.title.toUpperCase().includes(inputValue)) {
                songPlanMatches.push(songPlan)
            }
        })
        this.setState({
            searchPlanResults: songPlanMatches
        })
    }

    render() {
        return (
            <>
              <h1>Hi, {this.props.userName}</h1>
                <div className="main-container">
                  <div className="songPlan-container">
                    <h2>SONGPLANS</h2>  
                      <button class="btn btn-success" onClick={() => {this.props.history.push("/songPlans/new")}}>Create SongPlan</button>

                      { this.state.allSongPlans.map(song =>
                          <SongPlanCard key={song.id} song={song} deleteSong={this.deleteSong}
                          {...this.props}/>)
                      }
                    </div>

                    <div className="folder-container">
                      <h2>SEARCH RESULTS</h2>
                      <div className="input-container">
                         <input id="search" className="form-control search" type="text" placeholder="Search SongPlans" aria-label="Search" onChange={this.handleFieldChange}/>
                         <button type="button" class="btn btn-success" disabled={this.state.loadingStatus} onClick={this.search}>Search</button>
                       </div>

                       { this.state.searchPlanResults.map(result =>
                       <ResultsCard key={result.id} result={result} deleteSong={this.deleteSong}
                       {...this.props}/>)
                      }
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(SongPlanList);