import React, { Component } from "react";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { Tracker } from "meteor/tracker";
import axios from 'axios';
import { connect } from 'react-redux';
import { withTracker } from "meteor/react-meteor-data";
import { Users } from "../api/users.js";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';





/*const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});*/

class LoginTab extends Component {
    constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onClick = this.onClick.bind(this);
}

  handleChange(event) {
    this.setState({username: event.target.username}, {password: event.target.password});
  }

  routeChange(){
    let path = '/register';
    this.props.history.push(path);
  }

  

  onClick(event) {
    //alert("A name was submitted: " + this.state.value);
    event.persist();
  let that = this;
  Meteor.loginWithPassword(document.getElementById("username").value, document.getElementById("password").value, function (err) {
    if (!err) {
       Meteor.call("null.insert",
        document.getElementById("username").value,
        (err,res) => {
          if (err) {
            alert("Error inserting into Database")
            return;
          }
          //console.log(res + "was inserted")

          //console.log("null.find");
        });
        //if there is a challenger in lobby 
        that.props.history.push("/wager");
        //else 
       // that.props.history.push("/nochallenge");



    } else {
              //console.log('Check Username and Password')
              alert("User profile does not exist-Must register or check your username/cpassword")

    }
  })




}

  componentDidMount() {
        ValidatorForm.addValidationRule('isTruthy', value => value);
    }



  /*componentDidMount() {
    Tracker.autorun((c) => {
      var userId = Meteor.userId();
      if (c.firstRun)
        return;
      console.log(userId ? "Log-in" : "Log-out");
      if(userId){
        //Logged In
      } else {
        //Logged out. Redirect
        this.props.history.push("/");
      }

    });

  }*/


  render() {
  const { classes } = this.props;
    return (
      //<Paper className={classes.padding}>
        //<div className={classes.margin}>
        <div className="LoginClass">
            <ValidatorForm
                ref="form"
                //onChange={this.handleChange}
                onSubmit={this.onClick}
                onError={errors => console.log(errors)}
            >
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextValidator 
              id="username" 
              //onChange={this.handleChange}
              name="username"
              label="Username" 
              ref={input=> this.username=input} 
              type="username" 
              errorMessages={['this field is required']} 
              fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextValidator
                    id="password"
                    label="Password"
                    name="password"
                    ref={input=> this.password=input}
                    type="password"
                    errorMessages={['this field is required']}
                    fullWidth autoFocus required/>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <FormControlLabel control={
                <Checkbox
                color="primary"
                />
              } label="Remember me" />
            </Grid>
            <Grid item>
              <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary" onClick={this.routeChange.bind(this)} >Register</Button>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}  >Login</Button>
          </Grid>
          </ValidatorForm>

        </div>
     // </Paper>
    );
  }
}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(LoginTab));


/*export default withTracker(() => {
  const handle = Meteor.subscribe("users");
  return {
    //answer: Answer.findOne({gameInProgress : true}),
    user: Meteor.user(),
    ready : handle.ready()
  };
})(LoginTab);*/

//export default withRouter(connect()(withStyles(styles)(LoginTab)))

//export default withStyles(styles)(LoginTab);
