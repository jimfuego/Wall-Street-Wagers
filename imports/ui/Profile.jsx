import React, { Component } from "react";
import Achievements from "./Achievements.jsx";
import PredictionStats from "./Prediction-stats.jsx";
import Gambler from "./Gambler.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {withRouter} from "react-router-dom";
import Bio from "./Bio.jsx";
import MenuBar from "./MenuBar.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";

class Profile extends Component{
    constructor(props) {
    super(props);
  }
render(){
	return (
		<div className="container-fluid">
        <div className="row">
          <div className="col s12 12"><ButtonAppBar /></div>
          {/*<div className=" col s12 m7"><Gambler /></div>*/}
          <div className="col s12 m5"><PredictionStats /></div>
        </div>
          {/*<div className="col s12 m9"><Bio/></div>*/}
          <div className="achievements"><Achievements /></div>
        </div>
  );
  }
}

  export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Profile));
