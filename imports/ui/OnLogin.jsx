import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import MenuBar from "./MenuBar.jsx";
import { Wager } from "../api/wager.js";
import AcceptorDecline from "./AcceptorDecline.jsx";

class YourChallenges extends Component {
    constructor(props) {
        super(props);
    }

    renderChallenger() {
    }

    render() {
        return (
            /*if there are challenges render this page else render NoChallenge page*/
            <div className="container-fluid" role="main">
                <div className="yourChallenges">
                    <div className="col s12 12"><MenuBar/></div>
                    <h1 align="center">You have been Wagered</h1>
                    <div className="body">
                        <div className="row">
                            <div className="col s12 m6"><AcceptorDecline/> {this.renderChallenger()} </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

YourChallenges.propTypes = {
  challenger: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker (() => {
    const handle = Meteor.subscribe("wager");
    return {
        challenger: Wager.find({}).fetch(),
        user: Meteor.user(),
        ready: handle.ready()
    }
})(withRouter(YourChallenges));
