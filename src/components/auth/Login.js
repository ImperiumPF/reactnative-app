import axios from 'axios';
import React, { Component } from 'react';
import { Container, Header, Title, Content, Form, Item, Label, Input, Button, Left, Right, Body, Text } from 'native-base';

import { Loading } from '../common';
import deviceStorage from '../../services/deviceStorage';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  loginUser() {
    const { email, password, password_confirmation } = this.state;

    this.setState({ error: '', loading: true });

    axios.post("https://api.imperiumpf.me/v1/login",{
        email: email,
        password: password
    })
    .then((response) => {
      deviceStorage.saveKey("id_token", response.data.data.token);
      this.props.newJWT(response.data.data.token);
    })
    .catch((error) => {
      console.log(error);
      this.onLoginFail();
    });
  }

  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }

  render() {
    const { email, password, error, loading } = this.state;
    const { errorTextStyle, botao, foot } = styles;

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Login</Title>
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

            <Item floatingLabel last>
              <Label>Password</Label>
              <Input 
                secureTextEntry
                value={password}
                onChangeText={password => this.setState({ password })}
              />
            </Item>
          </Form>

          {!loading ?
            <Button 
               
              primary  
              onPress={this.loginUser}
              style={botao}>
              <Text> Login </Text>
            </Button>
            :
            <Loading size={'large'} />
          }

          <Button 
             
            success 
            onPress={this.props.authSwitch}
            style={botao}>
            <Text> Register </Text>
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
export { Login };