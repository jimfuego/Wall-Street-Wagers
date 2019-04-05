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


// import { Meteor } from "meteor/meteor";
// import { withTracker } from "meteor/react-meteor-data";

// 404
// const NotFoundPage = () =>
//   <div>
//     <h2>Page not found</h2>
//     <div>We should call Suhas 🤷‍♀️</div>
//   </div>;

//Main class
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        // <RaisedButton label="Oh yeah, button"/>
        <div className="container">
          <div className="row">
            <div className="col s12 12"><ButtonAppBar /></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s12 m7"><Gambler /></div>
            <div className="col s12 m5"><PredictionStats /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Achievements /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Landing /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Registration /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Bet /></div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

// export default withTracker(() => {
//   return {
//     user: Meteor.userId()
//   };
// })(App);
