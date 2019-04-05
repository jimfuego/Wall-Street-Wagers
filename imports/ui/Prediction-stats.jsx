import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
//import Card from "@material-ui/core/Card";
import { withTracker } from "meteor/react-meteor-data";
import {withRouter} from "react-router-dom";
import { Meteor } from "meteor/meteor";



 class PredictionStats extends Component {
    constructor(props) {
    super(props);
  }
  render() {
    return(
    	<div>
      <h2>Prediction Stats</h2>
      <Table className="prediction" responsive striped bordered hover variant="dark">
    <thead>
    </thead>
    <tbody>
      <tr>
      <td>Win%</td>
      <td>100</td>
      </tr>
      <tr>
      <td>Number of Games Played</td>
      <td>100</td>
      </tr>
      <tr>
      <td>Current Streak</td>
      <td>5 in a row</td>
      </tr>
      <tr>
      <td>Total bets placed</td>
      <td>300</td>
      </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(PredictionStats));
