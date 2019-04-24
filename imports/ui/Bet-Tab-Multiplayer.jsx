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
});

class BetTabMultiplayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      tickerSymbolInputInput: "",
      priceUsd: "",
      highLowInput: "",
      value:"",
      Bet:"",
      statechange:"initialized"
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

    //2 player bets.insert ()

    /*Meteor.call("bets.insert", this.state.tickerSymbolInputInput, this.state.Bet, (err, res) => {
      if(err){
        alert("Error inserting bet");
        console.log(err);
        return;
      }
      else if (res != undefined){
        console.log(res);
        alert("Stock price is (insert price of stock). Current price of stock is (insert current price of stock). Check again tommrow if you won/lost");
        
        //should render accept or decline button on "yourchallenges" page

        this.props.history.push("/profile");
        //
      }
    }*/
    Meteor.call("wager.insert",this.props.match.params.challengee, this.state.tickerSymbolInputInput,this.state.Bet, this.state.statechange, (err, res)=>{
           if (err) {
              alert("Error inserting challengee");
              console.log(err);
              return;
            }

            else{
                  this.props.history.push({
                  pathname: "/multibetchallengee/"+ this.props.history.location.state.thechallengee,
                  state: { tickerSymbolInputInput: this.state.tickerSymbolInputInput}});
                 

              //console.log(res + "has been inserted");

            }
           /* this.props.history.push("/winorlose")

            });*/
                 this.props.history.push({
          pathname: "/winorlose",
          state: { _id:this.props.location.state._id,
                   tickerSymbolInputInput: this.state.tickerSymbolInputInput,
                   challengerbet:this.state.Bet}});
         });


     


  
}
  

  //wager db
  //ticker symbol
  //price point-challenger
  //price point for challengee
  //challenger username
  //challengee username 
  //state
  //date created

  //update price point for challengee after he accepts it
   

  render() {
    const { classes } = this.props;
    console.log("Is this undefined" , this.props)
    return (
      <div className="BetClass">
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/><path fill="none" d="M0 0h24v24H0z"/></svg></Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField
              id="ticker"
              label="TickerSymbol"
              type="text"
              onChange={this.onChange.bind(this)}
              fullWidth autoFocus required />
            </Grid>
          </Grid>
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
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Make Prediction!</Button>
          </Grid>
      </div>
    );
  }
}
BetTabMultiplayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(BetTabMultiplayer)));
