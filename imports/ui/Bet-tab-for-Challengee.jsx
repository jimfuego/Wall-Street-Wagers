import { Component } from 'react';
import React from 'react';
import { Paper, withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Route, Redirect, Router, withRouter } from 'react-router-dom';
import { Meteor } from "meteor/meteor";
import HighLow from "./HighLow.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import CheckBackTommorow from "./CheckBackTommorow.jsx";




const styles = theme => ({
    height: 3,

    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    },

  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  root: {
    fontFamily: '"Montserrat", sans-serif',
  }

});

class BetTabForChallengee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      tickerSymbolInputInput: "",
      priceUsd: "",
      highLowInput: "",
      value:"",
      Bet:"",
      message:"",
      id:"",
      challengerbet:"",
      challengeebet:"",
      statechange:"Inprogress"
    };
    this.onClick=this.onClick.bind(this);
    this.onChange=this.onChange.bind(this);
  }

handleChange = event => {
    
    this.setState({ Bet: event.target.value });
  };

  onChange(event){
    console.log("change", event.target.value);
    this.setState({
      tickerSymbolInputInput: event.target.value
    });
  }

  onClick(event){
    event.preventDefault();
    //console.log(this.props.location.state._id)

    Meteor.call("wager.insertchallengeebet", this.state.Bet,this.props.location.state._id, (err, res) => {
      if(err){
        alert("Error inserting bet");
        console.log(err);
        return;
      }
      else{
      // this.props.history.push("/winorlose")
        this.props.history.push({
          pathname: "/winorlose",
          state: { _id:this.props.location.state._id,
                   challengeebet:this.state.Bet,
                   tickerSymbolInputInput:this.props.location.state.tickerSymbolInputInput,
                  challengerbet:this.props.location.state.challengerbet
                  //statechange:this.state.statechange
                }});
      }

      //challengerbet:this.props.location.state.challengerbet

    //}

        //alert(res);
      });

        //should render accept or decline button on "yourchallenges" page

        //this.props.history.push("/checkbacktomorrow");
      
    }
 

  render() {
    console.log("Render props for Bet tab for challengee" , this.props)
    console.log("what is challenger bet" + this.props.location.state.challengerbet)

    const { classes } = this.props;
    return (
      <div className="BetClass">
          <Grid container spacing={8} alignItems="flex-end">
          
          </Grid>
           <Grid container justify="center" style={{ marginTop: '10px' }}>
            <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Price Point</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.Bet}
            onChange={this.handleChange}
            inputProps={{
              name: 'Bet',
              id: 'demo-controlled-open-select',
            }}
            >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>

          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick} >Make Prediction!</Button>
          </Grid>
      </div>
      
    );
  }
}
BetTabForChallengee.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(BetTabForChallengee)));
