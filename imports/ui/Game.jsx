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
      console.log(this.props)
    const { classes, children, className, ...other } = this.props;

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
      <th>Your bet</th>
      <th>Other users bet</th>
      <th>Stock Price Next Day</th>

    </tr>
  </thead>
  <tbody className="footing">
    <tr className={classNames(classes.root, className)}>
      <td>(show stock name)</td>
      <td>(show stock opening price)</td>
      <td>(show your bet)</td>
      <td>(expected to render after other user bet)</td>
      <td>(expected to render upon market open)</td>

    </tr>
  </tbody>
</Table>
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