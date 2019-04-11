//<Button color="inherit" onClick={this.handleClose}>Logout</Button>
import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Achievements from "./Achievements.jsx";
import PredictionStats from "./Prediction-stats.jsx";
import Gambler from "./Gambler.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";
import Landing from "./Landing.jsx";
import Registration from "./Registration.jsx";
import Bet from "./Bet.jsx";
import LoginTab from "./Login-tab.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Redirect } from "react-router-dom";
import {withRouter} from "react-router-dom";
import Bio from "./Bio.jsx";
import MenuBar from "./MenuBar.jsx";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

class Rank extends Component{
  /*render() {
  	return(
  		);
  }*/
}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Rank));
