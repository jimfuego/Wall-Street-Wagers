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
import Table from 'react-bootstrap/Table';
import classNames from 'classnames';
import BetTabForChallengee from "./Bet-tab-for-Challengee.jsx";


//Hardest part. Rendering other users stats and checking if they win or lose
const styles = {
  root: {
    fontFamily: '"Montserrat", sans-serif',
  }
}

class Game extends Component{


    constructor(props) {
    super(props);

    this.state = {
      gambler: "",
      tickersymbol: "",


    };
    //this.handleChange = this.handleChange.bind(this);
    //this.onClick = this.onClick.bind(this);
}

   onClick(event){
        event.preventDefault();
         this.props.history.push("/profile");


   }


   componentDidUpdate(){
     /*Meteor.call("wager.fetchthisdatabasemayne", this.props.location.state._id,this.props.location.state.challengerbet,this.props.location.state.challengeebet,(err,res) => {
           if (err) {
              alert("Error fetching db");
              console.log(err);
              return;
            }

            else {
          console.log("Id found"+ res)
          console.log("Is this working");
          this.props.history.push({
          pathname: "/multibetchallengee/"+ this.props.history.location.state.thechallengee,
          state: { _id:this.props.location.state._id,
                   challengerbet:this.props.history.location.state.challengerbet}});
          //           this.props.history.push({
          // pathname: "/bettabforchallengee",
          // state: { 
          //          challengerbet:this.props.history.location.state.challengerbet}});
            }


     });*/


   }



     render() {
      //console.log("Render game props", this.props)
     //console.log("Important props", "challengerbet", this.props.location.state.challengerbet);

    const { classes, children, className, ...other } = this.props;
    //if(Meteor.user.username())
    return(
    <div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar /></div>
    
    {/*show you lose or win after other users input*/}
    <h1 align="center">Waiting for other users input</h1>
      <Table responsive striped bordered hover variant="dark">

  <thead className="heading">
    <tr>
      <th>Stock Name</th>
      <th>Stock Opening Price today </th>
      <th>Your Bet</th>
      <th>Stock Price Next Day</th>

    </tr>
  </thead>

  <tbody className="footing">
    <tr className={classNames(classes.root, className)}>
      <td>{}</td>
      <td>(show stock opening price)</td>
      <td>{}</td>
      <td>{}</td>
      <td>(expected to render upon market open)</td>

    </tr>
  </tbody>
</Table>
  <Button id="p"  variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Back to profile</Button>
      </div>
    );
  }
}






export default withTracker (() => {
	//const handle = Meteor.subscribe("loggedin");

	//const handle = Meteor.subscribe("userPresence");

  return {
    user: Meteor.user(),
  // usera: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),
   //userPresence: Presences.find({}).fetch(),


  }
})(withRouter(withStyles(styles)(Game)));