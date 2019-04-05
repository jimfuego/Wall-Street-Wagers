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

 class Bet extends Component {
  render() {
    return(
      <div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar/></div>
      <h1 className="seeb" text-align="center" >Make that bet</h1>
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
       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
