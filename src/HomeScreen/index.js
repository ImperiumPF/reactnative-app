import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MapScreen from "../MapScreen/index.js";
import ProfileScreen from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Map: { screen: MapScreen },
    Profile: { screen: ProfileScreen }
  },
  {
    drawerOpenRoute: 'DrawerOpen',
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;