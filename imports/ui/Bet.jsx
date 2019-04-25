import React, { Component } from "react";
import ButtonAppBar from "./ButtonAppBar.jsx";
import BetTab from "./Bet-tab.jsx";
import LoginNavBar from "./LoginNavBar.jsx";
import MenuBar from "./MenuBar.jsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import {Meteor} from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

//for single bets
 class Bet extends Component {
  render() {
  console.log("Render Bet for single player ", this.props)

    return(
      <div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar/></div>
      <h1 className="seeb" align="center" >Single Player Bet</h1>
        <div className="row-flex">
          <div className="column-flex">
          <Card className="HomeCard">
          <CardActionArea>
            <CardMedia
            title="Profile Picture"
            component="img"
            alt="User Profile Picture"
            className="mediabet"
            image="stock.jpeg"
            />
            <CardContent>
          <Typography component="p">
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
            <div className="column-flex"><BetTab /></div>
        </div>

      </div>
    )
  }
}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Bet));
