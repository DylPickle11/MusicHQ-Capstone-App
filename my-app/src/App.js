import React, {Component} from 'react';
import ApplicationViews from './Components/ApplicationViews';
//import Nav from './components/nav/Nav';
import Login from './Components/auth/Login'
import './App.css';

class App extends Component {
  state = {
    user: localStorage.getItem("credentials") !== null,
    userId: localStorage.getItem("credentials") !== null ? JSON.parse(localStorage.getItem("credentials")).id : false
  }

  // Check if credentials are in local storage
  //returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null


  setUser = (authObj) => {
    console.log("authObj", authObj)
    /*
      For now, just store the email and password that
      the customer enters into local storage.
    */
    localStorage.setItem(
      "credentials",
      JSON.stringify(authObj)
    )
    console.log(authObj, typeof authObj)
    this.setState({
      user: this.isAuthenticated(),
      userId: authObj.id
    });
  }

  render() {
    return(
      <>
        {this.state.user ?
          <>
            <ApplicationViews userId={this.state.userId} />
          </>
          :
          <Login setUser={this.setUser} />
        }
      </>
    )
  }
}

export default App;
