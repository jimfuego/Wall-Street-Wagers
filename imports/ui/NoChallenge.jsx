import Button from "@material-ui/core/Button";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class NoChallenge extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        this.props.history.push("/profile");
    }

    render() {
        return (
            <div className="container-fluid" role="main">
                <h1 align="center">Go to lobby and challenge someone today</h1>
                <h2 align="center">or click to go to profile</h2>
                <Button id="accept" align="center" variant="outlined" color="primary" style={{textTransform: "none"}}
                        onClick={this.onClick}>Go to profile</Button>
            </div>
        );
    }
}

  export default withTracker (() => {
    return {
    user: Meteor.user()
  };
})(withRouter(NoChallenge));
