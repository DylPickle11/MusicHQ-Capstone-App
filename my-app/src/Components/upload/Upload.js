import React, { Component } from 'react';
//import {Form, FormGroup, Label, Input, Button } from 'reactstrap';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";
import firebaseConfig from './UploadConfig'

firebase.initializeApp(firebaseConfig);

class Video extends Component {

 state = {
   video:'',
   videoURL:'',
   progress: 0
 }
 handleFieldChange = evt => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}

handleUploadStart = () => {
  this.setState({
    progress: 0
  })
}

handleUploadSuccess = filename => {
  this.setState({
    video: filename,
    progress: 100
  })
firebase.storage().ref().child(filename).getDownloadURL()
.then(url => this.setState({
  videoURL: url
}))
alert('Video Uploaded Successfully')
}

handleProgress = progress => {
  this.setState({
    progress: progress
  })
}

 render () {

  return(
   <> 
   <div>
    <label>Progress</label>
    <p>{this.state.progress}</p>

   </div>
   <FileUploader
   accept='image/*, audio/*, video/*'
   name='video'
   storageRef={firebase.storage().ref()}
   onUploadStart = {this.handleUploadStart}
   onUploadSuccess = {this.handleUploadSuccess}
   onProgress = {this.handleProgress}
   />
   </>
  )
 }

}

export default Video;