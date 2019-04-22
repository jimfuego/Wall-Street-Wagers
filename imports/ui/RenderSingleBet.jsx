import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import { Button, withStyles } from '@material-ui/core';
import { Paper, withStyles, Grid, TextField, Button } from '@material-ui/core';


const styles = {
  root: {
    fontFamily: '"Montserrat", sans-serif',
  }
}

class RenderSingleBet extends Component {
 constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
     this.props.history.push("/profile");
   }



  render() {
    return(
      <div>
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
    </div>

      );

  }

}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(RenderSingleBet)));
