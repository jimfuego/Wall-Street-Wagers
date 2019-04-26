import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import { withTracker } from "meteor/react-meteor-data";
import {withRouter} from "react-router-dom";
import { Meteor } from "meteor/meteor";

//work on prediction stats if possible
class PredictionStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wins: "",
      Gamesplayed: "",
      Streak: "",
      BetsPlaced: "",
      username: ""
    };
  }

  render() {
    console.log(this.props)
    return (
        <div>
          <h2>Prediction Stats</h2>
          <Table className="prediction" responsive striped bordered hover variant="dark">
            <thead>
            </thead>
            <tbody>
            <tr>
              <td>Wins</td>
              <td>{Meteor.user() ? Meteor.user().profile.wins : 0}</td>
            </tr>
            </tbody>
          </Table>
        </div>
    );
  }
}

export default withTracker (() => {
  const handle = Meteor.subscribe("user");
  return {
    user: Meteor.user(),
    ready: handle.ready()

  }
})(withRouter(PredictionStats));
