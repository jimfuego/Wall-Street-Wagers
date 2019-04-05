import { Component } from 'react';
import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import {Meteor} from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";



 class Bio extends Component {
	constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
}

  onClick(event) {
    event.preventDefault();
     this.props.history.push("/bet");
   }

render() {
  return(
    <div>
      <Grid container justify="center" style={{ marginTop: '10px' }}>
        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick} >Start Betting!</Button>
      </Grid>
    </div>
    );
}
}
export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(Bio));
