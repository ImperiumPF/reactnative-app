import React, { Component } from 'react';
import { Login, Register } from '../components/auth';

export default class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLogin: false
    };
    this.whichForm = this.whichForm.bind(this);
    this.authSwitch = this.authSwitch.bind(this);
  }

  authSwitch() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }

  whichForm() {
    if(!this.state.showLogin){
      return(
        <Register newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
      );
    } else {
      return(
        <Login newJWT={this.props.newJWT} authSwitch={this.authSwitch} />
      );
    }
  }

  render() {
    return(
        this.whichForm()
    );
  }
}