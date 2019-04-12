import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import { Route, Redirect, Router} from 'react-router-dom';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import PropTypes from "prop-types";
import { Grid, Button } from '@material-ui/core';
import {Front} from "../api/minimongo.js";



class Challenge extends Component {

	constructor(props) {
    super(props);

    this.state = {
      sendComponent: false,
      challenger:"",
      challengee:props.user,
      /*state:"",
      accept:false,
      inprogress:false,
      gameended:false*/

     // currentRoomId: Session.get('currentRoomId')
    };
    this.onClick = this.onClick.bind(this);
}

  renderUsers() {
        this.props.challenger.map(m =>
			<div className="" key={m._id}>{m.user}
         </div>

		);
  }

  onClick(event) {
    event.preventDefault();
     this.setState({
      sendComponent: true,
      challenger: Meteor.user().username,
      //comment
     // currentRoomId: Session.get('currentRoomId')
    });
     //doesnt work
     //{this.renderUsers()}
    this.props.history.push("/multibetchallenger/"+ this.state.challengee);




 }

   onChange(evt) {
    console.log(Meteor.user().username, evt.target.value);
    this.setState({
      challenger: evt.target.value
    });

  }

  	//render challenger on seperate wager page

  render() {
  	return (
  		<div className="container-fluid">
  	 	<div>
	      	<Grid container justify="center" style={{ marginTop: '10px' }}>
	        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Challenge</Button>
	      	</Grid>
    	</div>

  		</div>

  	);

  }

}

Challenge.propTypes = {
  //userPresence: PropTypes.arrayOf(PropTypes.object).isRequired
   challenger: PropTypes.object.isRequired,
   challengee: PropTypes.string.isRequired

};


export default withTracker (() => {
  return {
    challenger: Meteor.user(),
    challenger: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),

  }
})(withRouter(Challenge));
