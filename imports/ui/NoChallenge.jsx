import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Paper, Grid, Text, Face, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MenuBar from "./MenuBar.jsx";


class NoChallenge extends Component{

    constructor(props) {
    super(props);
    //this.state={
      //id: "",
    //}
    this.onClick=this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    //if(id="single")
     this.props.history.push("/profile");
   }
render() {

	return(

	  <div className="container-fluid" role="main">

	 <h1 align="center">Go to lobby and challenge someone today</h1>
	 <h2 align="center">or click to go to profile</h2>
	<Button id="accept" align="center" variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Go to profile</Button>

     </div>
	);

}

}


  export default withTracker (() => {
    return {
    user: Meteor.user()
  };
})(withRouter(NoChallenge));
