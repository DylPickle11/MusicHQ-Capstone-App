import React, { Component } from 'react';
import APIManager from '../../Modules/APIManager'
import CardHeader from 'reactstrap/lib/CardHeader';
import {Card, CardText, CardSubtitle, Button } from 'reactstrap';
import { FaRegEdit} from "react-icons/fa"

class SongPlanDetail extends Component {

    state = {
        userId: "", //sessionStorage.getItem(),
        title: "",
        date: "",
        description: "",
        video: "",
        keywordId: "",
        ifPublic: true,
        loadingStatus: true
    }

    handleDelete = () => {
      //invoke the delete function in APIManger and re-direct to the coffee list.
      this.setState({ loadingStatus: true })
      APIManager.delete(this.props.songPlanId)
        .then(() => this.props.history.push("/songPlans"))
    }
    componentDidMount() {
      console.log("SongPlanDetail: ComponentDidMount");
      //get(id) from APIManager and hang on to that data; put it into state
      APIManager.get(this.props.songPlanId)
        .then((song) => {
          this.setState({
            userId: song.userId,
            title: song.title,
            date: song.date,
            description: song.description,
            video: song.video,
            keywordId: song.keywordId,
            ifPublic: true,
            loadingStatus: false
          });
        });
    }

    render() {
      return (
        <Card className="songPlan-Card">
                <CardHeader>
                    {this.state.title}
                </CardHeader>
                <CardText>{this.state.description}</CardText>
                <CardSubtitle>{this.state.video}</CardSubtitle>
                <CardSubtitle>{this.state.keywordId}</CardSubtitle>
                <Button type="button" onClick={() => { this.props.history.push(`/songPlans/${this.props.songPlanId}/edit`) }}><FaRegEdit/></Button>
                <Button className="song-btns" color="danger" disabled={this.state.loadingStatus} onClick={this.handleDelete}>Delete</Button>
            </Card>
      );
    }
  }

  export default SongPlanDetail;