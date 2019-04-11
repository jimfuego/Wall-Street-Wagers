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
import MenuBar from "./MenuBar.jsx";
import { Wager } from "../api/wager.js";
import AcceptorDecline from "./AcceptorDecline.jsx";






class YourChallenges extends Component {

  constructor(props) {
    super(props);

  }

  /*onClick(event) {
    //alert("A name was submitted: " + this.state.value);
    event.preventDefault();
    //if(this.id=="accept"){
    this.props.history.push("/multibet");
	
	//}

	//else if(this.id=="decline"){
	//this.props.history.push("/profile");

	//}
   }*/

  renderChallenger() {
      //if
  }

   /*buttonClicked(event){
   	 event.preventDefault();
   	 this.props.history.push("/profile");
   }*/

  render() {
    return(
    	/*if there are challenges render this page else render NoChallenge page*/
      <div className="container-fluid" role="main">
      <div className="yourChallenges" >
      <div className="col s12 12"><MenuBar /></div>

   		<h1 align="center">You have been Wagered</h1>


   		<div className="body">
   			 <div className="row">
          	<div className="col s12 m6"><AcceptorDecline/> {this.renderChallenger()} </div>
   			</div>
    	</div>
    	</div>
    	</div>

    	);
}
}

YourChallenges.propTypes = {
  challenger: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker (() => {
	const handle = Meteor.subscribe("wager");

  return {
  	challenger: Wager.find({}).fetch(),
    user: Meteor.user(),
    ready : handle.ready()
  }
})(withRouter(YourChallenges));
