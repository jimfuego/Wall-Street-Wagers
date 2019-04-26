import React, { Component } from "react";
import Landing from "./Landing.jsx";
import Registration from "./Registration.jsx";
import Bet from "./Bet.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Profile from "./Profile.jsx";
import LobbyMultiPlayer from "./LobbyMultiPlayer.jsx";
import YourChallenges from "./YourChallenges.jsx";
import MultiBetChallengee from "./MultiBetChallengee.jsx";
import NoChallenge from "./NoChallenge.jsx";
import Game from "./Game.jsx";
import Rank from "./Rank.jsx";
import MultiBetChallenger from "./MultiBetChallenger.jsx";
import About from "./About.jsx";
import CheckBackTommorow from "./CheckBackTommorow.jsx";

//Main class
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/register" component={Registration}/>
                        <Route exact path="/bet" component={Bet}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/lobby" component={LobbyMultiPlayer}/>
                        <Route exact path="/wager" component={YourChallenges}/>
                        <Route exact path="/multibetchallengee/:challenger" component={MultiBetChallengee}/>
                        <Route exact path="/multibetchallenger/:challengee" component={MultiBetChallenger}/>
                        <Route exact path="/nochallenge" component={NoChallenge}/>
                        <Route exact path="/winorlose" component={Game}/>
                        <Route exact path="/rank" component={Rank}/>
                        <Route exact path="/about" component={About}/>
                        <Route exact path="/checkbacktomorrow" component={CheckBackTommorow}/>
                    </Switch>
                    <div></div>
                </div>
            </Router>
        );
    }
}

export default withTracker(() => {
    return {
        user: Meteor.userId()
    };
})(App);
