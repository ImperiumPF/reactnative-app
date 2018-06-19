import axios from 'axios';
import React, { Component } from 'react';
import { Container, Header, Title, Content, Form, Item, Label, Input, Button, Left, Right, Body, Text } from 'native-base';

import { Loading } from '../common';
import deviceStorage from '../../services/deviceStorage';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
      loading: false
    };

    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  registerUser() {
    const { email, password, password_confirmation } = this.state;

    this.setState({ error: '', loading: true });

    axios.post("https://api.imperiumpf.me/v1/register ",{
      user: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },)
    .then((response) => {
      deviceStorage.saveKey("id_token", response.data.data.token);
      this.props.newJWT(response.data.data.token);
    })
    .catch((error) => {
      console.log(error);
      this.onRegistrationFail();
    });
  }

  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  render() {
    const { email, password, password_confirmation, error, loading } = this.state;
    const { errorTextStyle, botao } = styles;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Register</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Text style={errorTextStyle}>
          {error}
        </Text>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input 
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input 
              secureTextEntry
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Item floatingLabel last>
            <Label>Password Confirmation</Label>
            <Input 
              secureTextEntry
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </Item>
        </Form>

          {!loading ?
            <Button
              primary  
              onPress={this.registerUser}
              style={botao}>
              <Text> Register </Text>
            </Button>
            :
            <Loading size={'large'} />
          }

          <Button 
             
            success 
            onPress={this.props.authSwitch}
            style={botao}>
            <Text> Log In </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  },
  botao: {
    margin: 10,
    padding: 15,
    alignSelf: 'center',
  }
};

export { Register };