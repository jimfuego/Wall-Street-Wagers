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
import {Wager} from "../api/wager.js";
import NoGamesInProgress from "./NoGamesInProgress.jsx"




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
      challengerbet:"",
      _id:""

    };
    //this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
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
   onClick(event){
        event.preventDefault();
         this.props.history.push("/profile");


   }

  /* onButtonClick(){
        event.preventDefault();
         this.props.history.push("/ranking");
   }*/
  
  /* componentDidUpdate(){
    let that = this;
    console.log("Check component did update")
     Meteor.call("wager.fetchthisdatabasemayne", this.props.location.state._id,this.props.location.state.challengerbet,this.props.location.state.challengeebet,(err,res) => {
         console.log(res)
           if (err) {
              alert("Error fetching db");
              console.log(err);
              return;
            }
        });
            //else {
         // console.log("Id found"+ res)
         
         that.props.history.push({
          pathname: "/multibetchallengee/"+ this.props.history.location.state.thechallengee,
          state: { _id:this.props.location.state._id,
                   challengerbet:this.props.history.location.state.challengerbet}});
           console.log("Is this working");*/
          //           this.props.history.push({
          // pathname: "/bettabforchallengee",
          // state: { 
          //          challengerbet:this.props.history.location.state.challengerbet}});
            //}


     


  // }

   renderWagers(){
  const { classes, children, className, ...other } = this.props;
    
    return this.props.wagers.map(m =>
     
    <tr className={classNames(classes.root, className)}>
      <td>{m.tickerSymbolInputInput}</td>
      <td>{m.openingPrice}</td>
      <td>{m.challengerbet}</td>
      <td>{m.challengeebet}</td>
      <td>{m.statechange}</td>
      <td>{m.challenger}</td>
      <td>{m.challengee}</td>
      </tr>


      );
      

   }



     render() {
     // console.log("Render game props", this.props)
     //console.log("Important props", "challengerbet", this.props.location.state.challengerbet);

    const { classes, children, className, ...other } = this.props;

    //check method
    /*if(Meteor.call("wager.size",(err)=>{
      if(err){
        console.log("Error grabbing collection size")
      }
    })!=0){*/
          return(
    <div className="container-fluid" role="main">
      <div className="col s12 12"><MenuBar /></div>
    
    {/*show you lose or win after other users input*/}
    <h1 align="center">GAMES IN PROGRESS</h1>
      <Table responsive striped bordered hover variant="dark">

  <thead className="heading">
    <tr>
      <th>Stock Name</th>
      <th>Stock Opening Price today </th>
      <th>Challenger Bet</th>
      <th>Challengee Bet</th>
      <th>Status</th>
      <th>Challenger Name</th>
      <th>Challengee Name</th>
    </tr>
  </thead>

  <tbody className="footing">
  {this.renderWagers()}

  </tbody>
</Table>
  <Button id="p"  variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Back to profile</Button>
  {/*<Button id="p"  variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>See your ranking</Button>*/}

      </div>
    );
    }

      /*}else {
        return <NoGamesInProgress/>
      }*/
  }







export default withTracker (() => {
	const handle = Meteor.subscribe("wagerresults");
  let wagers;
  let wagerfindbyid;
	//const handle = Meteor.subscribe("userPresence");
  if (Meteor.user()){
    wagers=Wager.find({ $or: [ { challengee: Meteor.user().username }, { challenger: Meteor.user().username } ] } ).fetch()
    
    //wagers=Wager.find({ $and:[ { _id:Meteor.userId() [ { $or: [ { challengee: Meteor.user().username }, { challenger: Meteor.user().username } ] }]   }]} ).fetch()

    wagerfindbyid=Wager.find({ _id:Meteor.userId()}).fetch();

  }
  else {
    console.log("user is undefined")
    wagers=[];
    wagerfindbyid=[];

  }
  return {
    user: Meteor.user(),

    wagers:wagers,
    wagerfindbyid:wagerfindbyid,

  // usera: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),
   //userPresence: Presences.find({}).fetch(),
   ready:handle.ready()


  }
})(withRouter(withStyles(styles)(Game)));