import React, { Component } from "react";
import { Paper, withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from "@material-ui/icons";
import {withRouter} from "react-router-dom";
import {Meteor} from "meteor/meteor";
import axios from 'axios';
import { withTracker } from "meteor/react-meteor-data";
import { Accounts } from "meteor/accounts-base";

/*const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});*/

class RegisterTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatpassword: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.email}, {password: event.target.password}, {repeatpassword: event.target.repeatpassword});
  }

  routeChange(){
    let path = '/gambler';
    this.props.history.push(path);
  }

  onClick(event) {
    //alert("A name was submitted: " + this.state.value);
    event.preventDefault();
    /*const userData = {
      email: this.state.email,
      password: this.state.password
    };
     axios
     //DONT FORGET************post to user collection
    //.post('/api/users/login', userData)
    .then(res =>this.props.history.push('/gambler'))
    .catch(err =>console.log(err)
    );*/
    let that = this;
    let profile = { wins:0,
                    gamesPlayed:0 };

    Accounts.createUser({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      profile: profile
      }, (err) => {
        if(err){
          alert("Error inserting into Db");
          console.log(err);
          return;
        }
        else {
          that.props.history.push("/profile");
      }
    }
   // Accounts.createUser("user.insert",document.getElementById("username").value, document.getElementById("password").value, (err, res) => {
    );
  }


  render() {
  const { classes } = this.props;
    return (
      //<Paper className={classes.padding}>
        //<div className={classes.margin}>
        <div>
        <form onSubmit={this.onClick}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField   id="username"
              ref={input =>
                (this.email = input)} label="Username" type="email" fullWidth autoFocus required  />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="password" label="Password" ref={input=> this.password=input} type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="repeatpassword" label="Repeat Password" ref={input=> this.repeatpassword=input} type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Register</Button>
          </Grid>
          </form>
        </div>
      //</Paper>
    );
  }
}
/*export default withTracker(() => {
  const handle = Meteor.subscribe("users");
  return {
    //answer: Answer.findOne({gameInProgress : true}),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(RegisterTab);*/


export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(RegisterTab));


//export default withStyles(styles)(RegisterTab);
