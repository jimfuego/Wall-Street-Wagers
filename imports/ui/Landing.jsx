import React, { Component } from "react";
import LoginTab from "./Login-tab.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

export default class Landing extends Component {
  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col s12 12"><ButtonAppBar /></div>
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
                  <div className="col s12 m12"><LoginTab /></div>
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    )
  }
}
