import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Challenge from "./Challenge.jsx";
import { Button } from '@material-ui/core';
import {Front} from "../api/minimongo.js";
import MenuBar from "./MenuBar.jsx";
import { Link } from 'react-router-dom';

class LobbyMultiPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: true,
            usera: "",
        };
        this.onClick = this.onClick.bind(this);
    }

    renderUsers() {
        return this.props.usera.map(m => {
            if (Meteor.user() && m.user != Meteor.user().username) {
                return (
                    <div className="" key={m._id}>{m.user}
                        {this.state.showComponent ?
                            <Challenge user={m.user}/> :
                            null
                        }
                    </div>);
            }
        });
    }

    onChange(evt) {
        console.log("change", evt.target.value);
        this.setState({
            usera: evt.target.value
        });
    }

    onClick(event) {
        event.preventDefault();
        this.setState({
            showComponent: true,
        });
        this.props.history.push("/profile");
    }

    render() {
        console.log("Render lobby multiplayer props", this.props)
        return (
            <div className="lobbs" role="main">
                <div className="col s12 12"><MenuBar/>
                    <h1 align="center">LOBBY</h1>
                    <div className="format" align="center">
                        <Button id="backtoprofile" align="center" variant="outlined" color="primary"
                                style={{textTransform: "none"}} onClick={this.onClick}>Go back to profile</Button>
                        <Button id="seechallenges" align="center" variant="outlined" color="primary"
                                style={{textTransform: "none"}}> <Link to="/wager" color="primary">See your
                            challenges</Link> </Button>
                    </div>
                    <div className="render" align="center"></div>
                    <h2 align="center">Users online</h2>
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}


LobbyMultiPlayer.propTypes = {
    //userPresence: PropTypes.arrayOf(PropTypes.object).isRequired
    usera: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withTracker (() => {
    const handle = Meteor.subscribe("loggedin");
    return {
        users: Meteor.user(),
        usera: Front.find({_id:{$ne:Meteor.userId()}},{sort:{'user': 1}}).fetch(),
        //userPresence: Presences.find({}).fetch(),
        ready : handle.ready()
    }
})(withRouter(LobbyMultiPlayer));
