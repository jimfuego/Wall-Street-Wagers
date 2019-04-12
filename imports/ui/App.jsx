import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import Achievements from "./Achievements.jsx";
import PredictionStats from "./Prediction-stats.jsx";
import Gambler from "./Gambler.jsx";
import ButtonAppBar from "./ButtonAppBar.jsx";
import Landing from "./Landing.jsx";
import Registration from "./Registration.jsx";
import Bet from "./Bet.jsx";
import LoginTab from "./Login-tab.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Redirect } from "react-router-dom";
import Profile from "./Profile.jsx";
import LobbyMultiPlayer from "./LobbyMultiPlayer.jsx";
import YourChallenges from "./YourChallenges.jsx";
import MultiBetChallengee from "./MultiBetChallengee.jsx";
import NoChallenge from "./NoChallenge.jsx";
import Game from "./Game.jsx";
import Rank from "./Rank.jsx";
import MultiBetChallenger from "./MultiBetChallenger.jsx";
import About from "./About.jsx";
import {CheckBackTomorrow} from "./CheckBackTomorrow.jsx";








// import { Meteor } from "meteor/meteor";
// import { withTracker } from "meteor/react-meteor-data";

// 404
// const NotFoundPage = () =>
//   <div>
//     <h2>Page not found</h2>
//     <div>We should call Suhas 🤷‍♀️</div>
//   </div>;

/*function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Meteor.userId() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !Meteor.userId() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}*/

//Main class
 class App extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      /*<MuiThemeProvider>
        // <RaisedButton label="Oh yeah, button"/>
        <div className="container">
          <div className="row">
            <div className="col s12 12"><ButtonAppBar /></div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col s12 m7"><Gambler /></div>
            <div className="col s12 m5"><PredictionStats /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Achievements /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Landing /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Registration /></div>
          </div>
          <div className="row">
            <div className="col s12 m12"><Bet /></div>
          </div>
        </div>
      </MuiThemeProvider>*/
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Registration}/>
            <Route exact path="/bet" component={Bet}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/lobby" component={LobbyMultiPlayer}/>
            <Route exact path="/wager" component={YourChallenges}/>
            <Route exact path="/multibetchallengee" component={MultiBetChallengee}/>
            <Route exact path="/multibetchallenger/:challengee" component={MultiBetChallenger}/>
            <Route exact path="/nochallenge" component={NoChallenge}/>
            <Route exact path="/winorlose" component={Game}/>
            <Route exact path="/rank" component={Rank}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/checkbacktomorrow" component={CheckBackTomorrow}/>
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

// export default withTracker(() => {
//   return {
//     user: Meteor.userId()
//   };
// })(App);
