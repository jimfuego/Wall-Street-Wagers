import React, { Component } from "react";
import ButtonAppBar from "./ButtonAppBar.jsx";
import BetTab from "./Bet-tab.jsx";
import Typography from "@material-ui/core/Typography";

export default class Bet extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s12 12"><ButtonAppBar /></div>
        </div>
        <div className="row">
          <div className="col s12 m12"><BetTab /></div>
        </div>
      </div>
    )
  }
}
