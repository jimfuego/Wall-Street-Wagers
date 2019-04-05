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

class Profile extends Component{
    constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
     this.props.history.push("/bet");
   }

render(){
  return (
    <div className="container-fluid" role="main">
    <div className="col s12 12"><MenuBar /></div>
      <div className="row">
      <h1 className="damn" text-align="center">Profile</h1>
          {/*<div className=" col s12 m7"><Gambler /></div>*/}
          <div className="col s12 m5"><PredictionStats /></div>
        </div>
        <div className="row">
          {/*<div className="col s12 m9"><Bio/></div>*/}
          {/*<div className="achievements"><Achievements /></div>*/}
          <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick} >Start Betting!</Button>
        </div>
    </div>
  );
}}

  export default withTracker (() => {
    return {
    user: Meteor.user()
  };
})(withRouter(Profile));
