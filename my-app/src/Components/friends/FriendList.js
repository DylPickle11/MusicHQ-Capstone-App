import APIManager from '../../Modules/APIManager';
import React, { Component } from "react";
import FriendCard from './FriendCard';
import MessageList from './messages/MessageList';
import { Button } from 'reactstrap';

//Make message form to send the message possibly a modal
//This should create and object that has the userId and friendId on it


export default class FriendList extends Component {
    state = {
      friends: [],
      friend: ""
    };

    componentDidMount() {
      console.log(this.props)
    APIManager.getFriends(this.props.userId)
         .then((friends)=>{
        this.setState({
            friends : friends,
         })
        })
    }

    render() {
      console.log(this.props)
      return (
        <>
          <div className="md-form active-purple active-purple-2 mb-3">
                <input id="search"className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={this.handleFieldChange}/>
                <Button type="button" /*disabled={this.state.loadingStatus} onClick={this.search}*/>Search</Button>
          </div>
          {/* <div>
           {/* Modal to Add Friends*/}
           {/* <Button onClick={this.toggle} type="button">Add to Folder</Button>
                  <Modal isOpen={this.state.modal1} toggle={this.toggle} className={this.props.className}>
			        <ModalBody>
				      <Form onSubmit={this.pushToFolder}>
				        <ModalHeader toggle={this.toggle}>Select A Folder</ModalHeader>

                        <FormGroup>
                          <Label for="folder">Push to Folder</Label>
                            <Input type="select" name="folder" id="folderSelect" onChange={this.handleFieldChange}>
                        {
                            this.state.allFolders.map(folder =>
                                <option key={folder.id} value={folder.id}>{folder.title}</option>
                            )
                        }
                         </Input>
                        </FormGroup>
					  </Form>
                    </ModalBody>
                    <ModalFooter>
		              <Button type="button" disabled={this.state.loadingStatus} onClick={this.pushToFolder}>Push to Folder</Button>
                    </ModalFooter>
                 </Modal>
          </div> */} 
          <div>
              <h1>Friends</h1>
            {this.state.friends.map(friend => (
              <FriendCard key={friend.id} friend={friend} {...this.props} />
            ))}
          </div>
          
          <div>
             <MessageList {...this.props} />
          </div>
        </>
      );
    }
  }