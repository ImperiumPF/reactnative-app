import React, { Component } from "react";
import HomeScreen from "../HomeScreen/HomeScreen.js";
import MapScreen from "./MapScreen.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Map: { screen: MapScreen },
    //Logout: { screen: LogoutScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;