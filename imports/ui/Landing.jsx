import React, { Component } from "react";
import LoginTab from "./Login-tab.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {Redirect} from "react-router-dom";
import { withRouter } from "react-router-dom";





 class Landing extends Component {
  //{Meteor.userId()?  (<Redirect to="/otherusers"/>) : (<Redirect to="/creategame"/>): this.state.component}
  render() {
    return(
    <div className="container-fluid" role="main">

    <div className="liz"><ButtonAppBar />
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
            <div className="column-flex"><LoginTab /></div>
        </div>

      </div>
      </div>
    )
  }
}
export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Landing));

/*export default withTracker(() => {
  //const handle = Meteor.subscribe("answer");
  return {
    //answer: Answer.findOne({gameInProgress : true}),
    //user: Meteor.user(),
    //ready : handle.ready()
  };
})(Landing);*/
