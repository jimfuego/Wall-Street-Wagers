import React, { Component } from "react";
import RegisterTab from "./Register-tab.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";

export default class Registration extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s12 12"><ButtonAppBar /></div>
        </div>
        <div className="row">
          <div className="col s12 12"><RegisterTab /></div>
        </div>
      </div>
    )
  }
}

// export default withStyles(styles)(Registration);
