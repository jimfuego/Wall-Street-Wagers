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
import BetTabMultiplayer from "./Bet-Tab-Multiplayer.jsx"
import classNames from 'classnames';


const styles = {
  root: {
    fontFamily: '"Montserrat", sans-serif',
  },

  subroot: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: "20px"
  }
}

 class MultiBetChallenger extends Component {
  
  constructor(props) {
    super(props);

    this.state = {

      tickerSymbol:"",
      challenger:props.user
      /*state:"",
      accept:false,
      inprogress:false,
      gameended:false*/

     // currentRoomId: Session.get('currentRoomId')
    };
    this.onClick = this.onClick.bind(this);
}

  //component did mount 
  
  onClick(event) {
    event.preventDefault();
     this.setState({
      tickerSymbol:"",
      challenger:props.user

      //comment
     // currentRoomId: Session.get('currentRoomId')
    });
     //doesnt work
     //{this.renderUsers()}

    this.props.history.push({
      pathname: "/multibetchallengee/"+ this.state.challenger,
      state: { tickerSymbol: ""}});

    /*this.props.history.push({
          pathname: "/winorlose/"+ this.props.location.state.thechallenger,
          state: { tickerSymbolInputInput: ""}});*/

    }



  render() {
    const { classes, children, className, ...other } = this.props;
    console.log("THis is from MultibetChallenger", this.props)

    return(
      <div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar/></div>
      <h1 className="seeb" align="center">Multi Player Bet</h1>
      <h2 className={classNames(classes.root, className)} align="center">Challengee: {this.props.location.state.thechallengee} </h2>
        <div className="row-flex">
          <div className="column-flex">
          <Card className="NewCard">
          <CardActionArea>
            <CardMedia
            title="MultiBetChallenger"
            component="img"
            alt="MultiBetChallenger"
            className="mediabet"
            image="stock.jpeg"
            />
            <CardContent>
          <Typography className={classNames(classes.subroot, className)} component="p">
          The challenger submits the intended stock name and price point to be bet 
          on and upon submission waits for the other user to submit their prediction.
          The winner is decided if they are closer to the price point of the actual stock on
          the next opening
          </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </div>
            <div className="column-flex"><BetTabMultiplayer /></div>
        </div>

      </div>
    )
  }
}



export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(MultiBetChallenger)));
