import React, { Component } from 'react';
import SongPlanCard from './SongPlanCard';
import { withRouter} from 'react-router-dom';

import APIManager from '../../Modules/APIManager';
import FolderList from '../folder/FolderList';
import { Button } from 'reactstrap';
import ResultsCard from './results/ResultsCard';
import FolderResultsCard from './results/ResultsCard';



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
        console.log(this.state.searchFolderResults)
        return (
            <>
                <h1>Song Plans</h1>

              <div className="md-form active-purple active-purple-2 mb-3">
                <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                <Button type="button" disabled={this.state.loadingStatus} onClick={this.search}>Search</Button>
              </div>
                <button onClick={() => {this.props.history.push("/songPlans/new")}}>New Post</button>
                <button onClick={() => {this.props.history.push("/folder/new")}}>New Folder</button>
                <h2>SONGPLANS</h2>
                {
                    this.state.allSongPlans.map(song =>
                        <SongPlanCard
                        key={song.id}
                         song={song}
                         deleteSong={this.deleteSong}
                         {...this.props}/>
                    )
                }
             
                <div>
                    <FolderList {...this.props} />
                </div>
                <h2>SEARCH PLAN RESULTS</h2>
                <div>
                {
                    this.state.searchPlanResults.map(result =>
                        <ResultsCard
                        key={result.id}
                         result={result}
                         deleteSong={this.deleteSong}
                         {...this.props}/>
                    )
                }
                </div>
                <h2>SEARCH FOLDER RESULTS</h2>
                <div>
                {
                    this.state.searchFolderResults.map(result =>
                        <FolderResultsCard
                        key={result.id}
                         result={result}
                         deleteSong={this.deleteSong}
                         {...this.props}/>
                    )
                }
                </div>   
                
            </>
        )
    }
}

export default withRouter(SongPlanList);