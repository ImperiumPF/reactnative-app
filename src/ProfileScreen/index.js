import React, { Component } from "react";
import HomeScreen from "../HomeScreen/HomeScreen.js";
import MapScreen from "../MapScreen/MapScreen.js";
import ProfileScreen from "./ProfileScreen.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Map: { screen: MapScreen },
    Profile: { screen: ProfileScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;