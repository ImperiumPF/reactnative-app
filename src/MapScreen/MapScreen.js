import React, { Component } from 'react';
import { StyleSheet, 
  View,
  Text,
  Dimensions,
  InteractionManager, } from 'react-native';
import {
  Button,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Footer,
  FooterTab
} from "native-base";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default class MapScreen extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const ratio = width / height;

    //TODO: Get user coordinates
    const coordinates = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0922 * ratio,
      bool: true
    };
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
            <Title>Map</Title>
          </Body>
          <Right />
        </Header>

        <Content scrollEnabled={false}>
          <View style={{ width, height }}>
            {this.state.loading ? (
              <Loading />
            ) : (
              <MapView
                style={styles.map}
                initialRegion={coordinates}
                showsUserLocation={coordinates.bool}
              />
            )}
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button transparent>
              Maps
              <Icon name="ios-map" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const Loading = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
});