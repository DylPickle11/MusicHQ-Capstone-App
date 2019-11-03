import React, { Component } from 'react';
import APIManager from '../Modules/APIManager';
import {Card, CardText, Button, CardHeader} from 'reactstrap';
// import {FaRegTrashAlt, FaRegEdit } from "react-icons/fa"


class SearchCard extends Component {
    saveToUser = () =>{
        // Create new Object
        const songForUser = {
                userId: this.props.userId,
                title: this.props.publicPlan.title,
                date: this.props.publicPlan.date,
                description: this.props.publicPlan.description,
                type: this.props.publicPlan.type,
                levelOption: this.props.publicPlan.level,
                comment: this.props.publicPlan.comment,
                ifPublic: this.props.publicPlan.ifPublicChoice,
                loadingStatus: true
        } 
        console.log(songForUser)
         APIManager.post("songPlans", songForUser)
        // .then(() => this.props.history.push("/search"))  
        
    }

    render() {
        return (
            <Card>
                <CardHeader>{this.props.publicPlan.title}</CardHeader>
                <CardText>{this.props.publicPlan.description}</CardText>
                <CardText>{this.props.publicPlan.levelOption}</CardText>
                <CardText>{this.props.publicPlan.type}</CardText>
                <Button type="button" /*disabled={this.state.loadingStatus}*/ onClick={this.saveToUser}>Save to User</Button>
                {/* <Button onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/files`) }}>Open Folder</Button>
                <Button type="button" onClick={() => { this.props.history.push(`/folder/${this.props.folder.id}/edit`) }}><FaRegEdit/></Button>
                <Button className="song-btns" color="danger" onClick={this.handleDelete}><FaRegTrashAlt/></Button> */}
            </Card>
        )
    }
}

export default SearchCard