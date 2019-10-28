import React, { Component } from 'react';
import SongPlanCard from './SongPlanCard';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import FolderList from '../folder/FolderList';
import { Button } from 'reactstrap';
import ResultsCard from './results/ResultsCard'


class SongPlanList extends Component {
    state = {
        allSongPlans: [],
        searchPlanResults: [],
        searchFolderResults: []
    }

    componentDidMount() {
        APIManager.getAll("songPlans").then((allSongs) => {
            this.setState({
                allSongPlans: allSongs
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
                APIManager.getAll("songPlans").then((allSongs) => {
                    this.setState({
                        allSongs: allSongs
                    })
                })
            })
    }

    search = () => {
        const searchInput = document.getElementById("search");
        let inputValue = searchInput.value;
        APIManager.searchDatabase(inputValue, "songPlans", "title")
        .then((matchSongPlanResults) => {
            console.log(matchSongPlanResults)
               this.setState({
                searchPlanResults: matchSongPlanResults
            })
            })
        APIManager.searchDatabase(inputValue, "folders", "title")
        .then((matchFolderResult) => {
            this.setState({
                searchFolderResults: matchFolderResult
            })
       })
}





    render() {
        console.log(this.state.searchPlanResults)
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
                    <FolderList />
                </div>
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
                <div>
                {
                    this.state.searchFolderResults.map(result =>
                        <ResultsCard
                        key={result.id}
                         result={result}
                         deleteSong={this.deleteSong}
                         {...this.props}/>
                    )
                }
                </div>  
                </div>  
                
            </>
        )
    }
}

export default withRouter(SongPlanList);