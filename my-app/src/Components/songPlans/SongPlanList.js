import React, { Component } from 'react';
import SongPlanCard from './SongPlanCard';
import { withRouter } from 'react-router-dom';
import APIManager from '../../Modules/APIManager';
import FolderList from '../folder/FolderList';


class SongPlanList extends Component {
    state = {
        allSongPlans: []
    }

    componentDidMount() {
        APIManager.getAll("songPlans").then((allSongs) => {
            this.setState({
                allSongPlans: allSongs
            })
        })
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





    render() {
        return (
            <>
                <h1>Song Plans</h1>

              <div className="md-form active-purple active-purple-2 mb-3">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search"/>
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
            </>
        )
    }
}

export default withRouter(SongPlanList);