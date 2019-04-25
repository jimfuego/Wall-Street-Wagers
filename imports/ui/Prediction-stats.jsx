import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
//import Card from "@material-ui/core/Card";
import { withTracker } from "meteor/react-meteor-data";
import {withRouter} from "react-router-dom";
import { Meteor } from "meteor/meteor";

//work on prediction stats if possible
 class PredictionStats extends Component {
    constructor(props) {
    super(props);

    this.state = {
      Win: "",
      Gamesplayed: "",
      Streak: "",
      BetsPlaced: "",
    };
  }
 
  /*componentDidMount(){
    Meteor.call("user.insert",this.state.Win,this.state.GamesPlayed, this.state.BetsPlaced, (err,res) =>{
      if(err){
        console.log("User profile cannot be inserted")
        return;
      }


      console.log("User profile was inserted")


    });

    Meteor.call("user.getWins", this.state.Win,(err,res) => {
            if(err){
        console.log("User profile cannot be inserted")
        return;
          }

      this.setState({
        Win: "",
        Gamesplayed: "",
        Streak: "",
        BetsPlaced: "",
      });

   });*/
   componentDidMount(){
    Meteor.call("user.insert",this.state.Win,this.state.GamesPlayed, this.state.Streak, this.state.BetsPlaced, (err,res) =>{
      if(err){
        console.log("User profile cannot be inserted")
        return;
      }

      //console.log("User profile was inserted")
      this.setState({
        Win: "",
        Gamesplayed: "",
        Streak: "",
        BetsPlaced: "",
      });

    });
 

}



  render() {
    return(
    	<div>
      <h2>Prediction Stats</h2>
      <Table className="prediction" responsive striped bordered hover variant="dark">
    <thead>
    </thead>
    <tbody>
      <tr>
      <td>Win%</td>
      <td>{this.state.Win}</td>
      </tr>
      <tr>
      <td>Number of Games Played</td>
      <td>{this.state.GamesPlayed}</td>
      </tr>
      <tr>

      </tr>
      <tr>
      <td>Total bets placed</td>
      <td>{this.state.BetsPlaces}</td>
      </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default withTracker (() => {
    const handle = Meteor.subscribe("user");

  return {
    user: Meteor.user(),
    ready : handle.ready()

  }
})(withRouter(PredictionStats));
