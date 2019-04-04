import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
//import Card from "@material-ui/core/Card";

export default class PredictionStats extends Component {
  render() {
    return(
    	<div>
      <h4>Prediction Stats</h4>
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
