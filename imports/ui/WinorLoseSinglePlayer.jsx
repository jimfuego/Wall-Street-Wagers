import Button from "@material-ui/core/Button";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";


class WinorLoseSinglePlayer extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();
        //if(id="single")
        this.props.history.push("/profile");
    }

    render() {
        return (
            <div className="container-fluid" role="main">
                <h1 align="center">You beat the market today</h1>
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
})(withRouter(WinorLoseSinglePlayer));