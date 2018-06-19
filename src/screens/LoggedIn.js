import React, { Component } from 'react';
import axios from 'axios';

import HomeScreen from "../HomeScreen/index.js";

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      email: '',
      error: ''
    }
  }

  componentDidMount(){
    const headers = {
      'Authorization': 'Bearer ' + this.props.jwt
    };
    axios({
      method: 'GET',
      url: 'https://api.imperiumpf.me/v1/me',
      headers: headers,
    }).then((response) => {
      this.setState({
        email: response.data.email,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  render() {
    return <HomeScreen />;
  }
}