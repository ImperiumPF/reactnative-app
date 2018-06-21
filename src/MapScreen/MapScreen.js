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

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers:
        {
          latLong: {
            latitude: 39.6014488,
            longitude: -8.4082202,
          },
          key: 'Tapavino',
          title: 'Tapavino',
          description: '6 Bulletin Pl, Sydney NSW 2000',
        }
    };
  }

 componentDidMount = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
    },
  (error) => console.log(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  




  


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
                provider={ PROVIDER_GOOGLE }
                style={styles.map}
                showsUserLocation={ true }
                followsUserLocation={ true }
                region={ this.state.region }
              >
              <MapView.Marker
                coordinate={this.state.markers.latLong}
                title={this.state.markers.title}
                description={this.state.markers.description}
              />
              </MapView>
            )}
          </View>
        </Content>

        <Footer>
          <FooterTab>
            <Button 
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
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