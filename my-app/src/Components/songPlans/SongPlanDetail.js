import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager'
import CardHeader from 'reactstrap/lib/CardHeader';
import {Card, CardText, CardSubtitle, Button } from 'reactstrap';
import { FaRegEdit} from "react-icons/fa"

class SongPlanDetail extends Component {
    state = {
        userId: sessionStorage.getItem('activeUser'),
        title: "",
        date: "",
        description: "",
        type: "",
        levelOption: "",
        ifPublic: "",
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
            loadingStatus: false
          });
        });
    }

    render() {
      return (
        <Card>
                <CardHeader>Title:{this.state.title}</CardHeader>
                <CardSubtitle>Date:{this.state.date}</CardSubtitle>
                <CardText>Description:{this.state.description}</CardText>
                <CardText>Type:{this.state.type}</CardText>
                <CardText>Level:{this.state.levelOption}</CardText>
                <CardText>Public:{this.state.ifPublic}</CardText>
                <Button type="button" onClick={() => { this.props.history.push(`/songPlans/${this.props.songPlanId}/edit`) }}><FaRegEdit/></Button>
                <Button className="song-btns" color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button>
            </Card>
      );
    }
  }

  export default SongPlanDetail;