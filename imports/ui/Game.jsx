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
import {Front} from "../api/minimongo.js";
import Table from 'react-bootstrap/Table'



class Game extends Component{

    constructor(props) {
    super(props);

    this.state = {
      bet: "",
    };
    //this.handleChange = this.handleChange.bind(this);
    //this.onClick = this.onClick.bind(this);
}

//renderUsers() {
    /*return this.props.usera.map(m =>
      <div className="" key={m._id}>{m.user}
	<Button onClick={this.onClick}/>
           {this.state.showComponent ?
           <PromptLobbyUser /> :
           null
        }
        <br>
        </br>
        </div>
        );*/
        //if (!Meteor.user()){
       /*return this.props.usera.map(m =>
			<div className="" key={m._id}>{m.user}
			{this.state.showComponent ?
           <Challenge /> :
           null
        }
         </div>
		);*/

		//}


  //}

  /*onChange(evt) {
    console.log("change", evt.target.value);
    this.setState({
      usera: evt.target.value
    });
  }

  onClick(event) {
    event.preventDefault();
    this.setState({
      showComponent: true,
    });

     this.props.history.push("/profile");

   // <PromptLobbyUser/>;
     //this.props.history.push("/bet");
   }

     onButtonClick(event){
     event.preventDefault();
     this.props.history.push("/lobby");

   }*/

     render() {
    return(
    	<div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar /></div>
    <h1 align="center">You Lose</h1>
      <Table responsive striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Stock Name</th>
      <th>Stock Price</th>
      <th>Your bet</th>
      <th>User 2 bet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>MSFT</td>
      <td>180</td>
      <td>160</td>
      <td>150</td>
    </tr>
  </tbody>
</Table>
      </div>
    );
  }
}






export default withTracker (() => {
	const handle = Meteor.subscribe("loggedin");

	//const handle = Meteor.subscribe("userPresence");

  return {
    users: Meteor.user(),
  // usera: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),
   //userPresence: Presences.find({}).fetch(),
   ready : handle.ready()

  }
})(withRouter(Game));
