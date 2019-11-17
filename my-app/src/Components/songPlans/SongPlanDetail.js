import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager'
import { Button, Card, CardText, CardSubtitle, } from 'reactstrap';
import { FaRegEdit } from "react-icons/fa"
import { Player } from 'video-react';
import './SongPlan.css'

class SongPlanDetail extends Component {
    state = {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: "",
        description: "",
        type: "",
        levelOption: "",
        ifPublic: "",
        videoURL:'',
        loadingStatus: true
    }

    handleDelete = () => {
      //invoke the delete function in APIManger and re-direct to the coffee list.
      this.setState({ loadingStatus: true })
      APIManager.delete("songPlans", this.props.songPlanId)
        .then(() => this.props.history.push("/songPlans"))
    }

    componentDidMount() {
      console.log("SongPlanDetail: ComponentDidMount");
      //get(id) from APIManager and hang on to that data; put it into state
      APIManager.get("songPlans", this.props.songPlanId)
        .then((song) => {
          this.setState({
            userId: song.userId,
            title: song.title,
            date: song.date,
            description: song.description,
            type: song.type,
            levelOption: song.levelOption,
            ifPublic: song.ifPublic,
            videoURL: song.videoURL,
            loadingStatus: false
          });
        });
    }

    render() {
      return (
        <Card>
                <h5 className="card-title">Title: {this.state.title}</h5>
                <p>Date: {this.state.date}</p>
                <p>Description: {this.state.description}</p>
                Sheet Music:<div className="image"><img  className="image"alt='Video image' src={`${this.state.videoURL}`} /></div>
                {/* Video: <div style={{height: '400px'}, {width: '400px'}}><Player playsInline poster="/assets/poster.png" src={`${this.state.videoURL}`} fluid={true}/></div> */}

                <p className="card-text">Type: {this.state.type}</p>
                <p className="card-text">Level: {this.state.levelOption}</p>
                <p className="card-text">Public: {this.state.ifPublic}</p>
                <Button type="button" onClick={() => { this.props.history.push(`/songPlans/${this.props.songPlanId}/edit`)}}>Edit</Button>
                <Button className="song-btns" color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button>
            </Card>
      );
    }
  }

  export default SongPlanDetail;