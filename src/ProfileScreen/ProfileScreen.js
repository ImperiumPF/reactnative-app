import React, { Component } from "react";
import {Button, Text, Container, Body, Content, Header, Title, Left, Icon, Right } from "native-base";



export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>This is the Profile Screen</Text>
        </Content>
      </Container>
    );
  }
}