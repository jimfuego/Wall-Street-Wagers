import React, { Component } from "react";
import RegisterTab from "./Register-tab.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MenuBar from "./MenuBar.jsx";

 class Registration extends Component {
  render() {
    return(
      <div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar /></div>
      <h1 className="stregis" text-align="center">Register</h1>
        <div className="row">
        </div>
        <Card className="TheCard">
          <CardActionArea>
            <CardMedia
            title="Profile Picture"
            component="img"
            alt="User Profile Picture"
            className="{classes.media}"
            image="ace-action-adult-1688506.jpg"
            />
            <CardContent>
              <div className="container">
                <div className="row">
                  <div className="col s12 m12"><RegisterTab /></div>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    )
  }
}

/*export default withTracker(() => {
  //const handle = Meteor.subscribe("answer");
  return {
    //answer: Answer.findOne({gameInProgress : true}),
    user: Meteor.user(),
    //ready : handle.ready()
  };
})(Registration);*/
export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Registration));
