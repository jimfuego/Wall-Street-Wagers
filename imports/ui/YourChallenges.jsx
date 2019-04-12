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
import NoChallenge from "./NoChallenge.jsx";







class YourChallenges extends Component {

  constructor(props) {
    super(props);

    this.state = {
      challenger: "",
      challengerexists:false
    };
    this.onClick=this.onClick.bind(this);
    this.onButtonClick=this.onButtonClick.bind(this);

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

   componentDidMount(){
   		 Meteor.call("wager.findmychallenges", (err,res)=> {
   		 	if (err) {
            alert("There was an error finding challenges");
            console.log(err);
            return;
          }
   			else{
   				if(res.length > 0) {
   					this.setState({
   						challengerexists:true
   					})
   				}
   			}

   		});
   }

   onClick(event) {
    event.preventDefault();

    //if(id="single")
     this.props.history.push("/profile");
   }
   onButtonClick(event){
   	event.preventDefault();

     this.props.history.push("/lobby");

   }

  renderChallenger() {

  	//if the challenger exists and the (challenger make prediction button) has been clicked then render the card that says accept or decline
  	if(this.state.challengerexists){
    return (this.props.challenger.map(m =>

      (<div className="" key={m._id}> {m.challenger}
		<AcceptorDecline/>
      </div>)));}

    	else {
    		return(
     <div className="container-fluid" >
    <h1 align="center">Refresh to see new challenges or go to lobby and challenge someone</h1>
    <Button id="lobby" variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onButtonClick}>Go to lobby</Button>
	 <h2 align="center">Or click to go to profile</h2>
	<Button id="p"  variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Go to profile</Button>
    </div>);}

	}


	 /* renderChallenger() {
		return this.props.challenger.map(m =>{

      <div className="" key={m._id}> {m.challenger}

      </div>);

	  }
	}*/

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

   		{this.state.challengerexists? <h1 align="center">You have been Wagered</h1>:<div></div>}


   		<div className="body">
   			 <div className="row">
          	<div className="col s12 m6"> {this.renderChallenger()} </div>
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
