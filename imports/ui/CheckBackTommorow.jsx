import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import { Button, withStyles } from '@material-ui/core';
import classNames from 'classnames';

//
const styles = {
  root: {
    fontFamily: '"Montserrat", sans-serif',
  }
}

class CheckBackTommorow extends Component {
 constructor(props) {
    super(props);
    this.onClick=this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
     this.props.history.push("/profile");
   }



  render() {
    const { classes, children, className, ...other } = this.props;
   console.log("Render checkback tomorrow for single player", this.props)

    return(
      <div>
      <h3 className={classNames(classes.root, className)}>Congrats on submitting your bet. Check back tomorrow to see if you beat the stock market</h3>
    <Button id="p"  variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.onClick}>Go to profile</Button>
    </div>

      );

  }

}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(CheckBackTommorow)));
