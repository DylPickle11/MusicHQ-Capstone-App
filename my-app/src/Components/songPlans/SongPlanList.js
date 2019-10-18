import React, { Component } from 'react';
import SongPlanCard from './SongPlanCard';
import { Route , withRouter} from 'react-router-dom';
import APIManager from '../../Modules/APIManager';

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
        console.log("pls render songs")
        console.log(this.props)
        return (
            <>
                <h1>Song Plans</h1>
                <button onClick={() => {this.props.history.push("/songPlans/new")}}>New Post</button>

                {
                    this.state.allSongPlans.map(song =>
                        <SongPlanCard
                        key={song.id}
                         song={song}
                         deleteSong={this.deleteSong}
                         {...this.props}/>
                    )
                }
            </>
        )
    }
}

export default SongPlanList;