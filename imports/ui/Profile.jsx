import React, { Component } from "react";
import PredictionStats from "./Prediction-stats.jsx";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {withRouter} from "react-router-dom";
import MenuBar from "./MenuBar.jsx";
import { Link } from 'react-router-dom'

// Work on profile if possible
class Profile extends Component{
    constructor(props) {
        super(props);
        //this.state={
        //id: "",
        //}
        this.onClick=this.onClick.bind(this);
    }

    onClick(event) {
        event.preventDefault();

        //if(id="single")
        this.props.history.push("/bet");
    }

    onButtonClick(event){
        event.preventDefault();
        this.props.history.push("/lobby");
    }


    render(){
        return (
            <div className="col s12 12"><MenuBar />
                <div className="container-fluid" role="main">
                    <div className="row">
                        {/*<div className=" col s12 m7"><Gambler /></div>*/}
                        <h1 className="damn" align="center">Your Profile</h1>
                        <div className="col s12 m6"><PredictionStats /></div>
                    </div>
                    <div className="row">
                        <Link className="btn btn-primary btn-lg col s6 s6"  to="/bet">Single Player</Link>
                        <Link className="btn btn-primary btn-lg col s6 s6" to="/lobby">Multi-Player</Link>
                        <Link className="btn btn-primary btn-lg col s12 s12" to="/winorlose">Multiplayer Games in Progress</Link>
                        <Link align="center" className="btn btn-primary btn-lg col s12 s12" to="/wager">See who challenged you</Link>


                    </div>
                    <div className="row">
                        {/*<div className="achievements"><Achievements /></div>*/}
                    </div>
                </div>
            </div>
        );
    }}

export default withTracker (() => {
    return {
        user: Meteor.user()
    };
})(withRouter(Profile));
