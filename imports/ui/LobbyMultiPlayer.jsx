import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Challenge from "./Challenge.jsx";
import { Paper, withStyles, Grid, Face, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import {Front} from "../api/minimongo.js";
import MenuBar from "./MenuBar.jsx";






 class LobbyMultiPlayer extends Component {
    constructor(props) {
    super(props);
    this.state = {
      showComponent: true,
      usera:"",
     // currentRoomId: Session.get('currentRoomId')
    };

   /* Presence.state = function() {
  	return {
    currentRoomId: Session.get('currentRoomId')
  	};
	}*/
    this.onClick=this.onClick.bind(this);

  }

   renderUsers() {
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
       return this.props.usera.map(m =>{
       		if(Meteor.user() && m.user!=Meteor.user().username){
       			return(

			<div className="" key={m._id}>{m.user}
			{this.state.showComponent ?
           <Challenge user={m.user} /> :
           null
        }
         </div>);}
		});

		//}


  }

  onChange(evt) {
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



  render(){
  //console.log(Presences.find({}));
  return (
    <div className="lobbs" role="main">
        <div className="col s12 12"><MenuBar />
        <h1 align="center" >LOBBY</h1>
        <div className="format" align="center">
	<Button id="accept" align="center" variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Go back to profile</Button>
	</div>
        <div className="render" align="center"></div>
        <h2 align="center">Other users online</h2>
        {this.renderUsers()}
      </div>
    </div>
  );
//}
}

}


LobbyMultiPlayer.propTypes = {
  //userPresence: PropTypes.arrayOf(PropTypes.object).isRequired
   usera: PropTypes.arrayOf(PropTypes.object).isRequired

};


export default withTracker (() => {
	const handle = Meteor.subscribe("loggedin");

	//const handle = Meteor.subscribe("userPresence");

  return {
    users: Meteor.user(),
   usera: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),
   //userPresence: Presences.find({}).fetch(),
   ready : handle.ready()

  }
})(withRouter(LobbyMultiPlayer));
