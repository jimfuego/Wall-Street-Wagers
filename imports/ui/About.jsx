import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
//import Card from "@material-ui/core/Card";
import { withTracker } from "meteor/react-meteor-data";
import {withRouter} from "react-router-dom";
import { Meteor } from "meteor/meteor";
import ButtonAppBar from "./ButtonAppBar.jsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

 class About extends Component {

  render() {
    return(
    	<div className="container-fluid" role="main">

    	<div className="">
    	<h1>About Wall Street Wagers</h1>

      <h1 className="fuckall" align="center">Beat Wall Street</h1>
        <div className="row-flex">
          <div className="column-flex">
          <Card className="HomeCard">
          <CardActionArea>
            <CardMedia
            title="Profile Picture"
            component="img"
            alt="User Profile Picture"
            className="media"
            image="ace-action-adult-1688506.jpg"
            />
            <CardContent>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
            <div className="column-flex"></div>
			Wall-Street-Wagers is a game that allows users to bet against the stock market
        </div>

      </div>
      	</div>
    );
  }
}


export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(About));
