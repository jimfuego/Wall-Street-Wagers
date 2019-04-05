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
import HighLow from "./HighLow.jsx"

const styles = theme => ({
    height: 3,

    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class BetTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      tickerSymbolInputInput: "",
      priceUsd: "",
      highLowInput: ""
    };
    this.onClick=this.onClick.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  onChange(event){
    console.log("change", event.target.value);
    this.setState({
      tickerSymbolInputInput: event.target.value
    });
  }

  onClick(event){
    event.preventDefault();

    Meteor.call("bets.insert", this.state.tickerSymbolInputInput, (err, res) => {
      if(err){
        alert("Error inserting bet");
        console.log(err);
        return;
      }
      // alert(res);
      // else if (res != null && res != undefined){
      //   console.log(res);
      //   alert("Stock price is (insert price of stock). Current price of stock is (insert current price of stock). Check again tommrow if you won/lost");
      //   this.props.history.push("/profile");
      // }
    }
  )}

  render() {
    const { classes } = this.props;
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
            <Grid item>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/><path fill="none" d="M0 0h24v24H0z"/></svg>            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="date" label="Prediction Date" type="date" fullWidth required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>            </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="usd" label="Predicted closing price (USD)" type="number" fullWidth required /></Grid>
          </Grid>
           <Grid container justify="center" style={{ marginTop: '10px' }}>
                <HighLow/>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Make Prediction!</Button>
          </Grid>
      </div>
    );
  }
}
BetTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(BetTab)));
