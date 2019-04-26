import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MenuBar from "./MenuBar.jsx";
import BetTabForChallengee from "./Bet-tab-for-Challengee.jsx"
import classNames from 'classnames';

const styles = {
  root: {
    fontFamily: '"Montserrat", sans-serif',
  },
  subroot:{
    fontFamily: '"Montserrat", sans-serif',
    fontSize: "25px",
  }
};

class MultiBetChallengee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerSymbolInputInput: ""
    }
  }

  componentDidMount() {
    Meteor.call("wager.fetchthisdatabasemayne", this.props.location.state.challengerbet, (err, res) => {
      console.log("Check challenger bet" + this.props.location.state.challengerbet)
      if (err) {
        alert("Error fetching db");
        console.log(err);
        return;
      } else {
        console.log("Id found" + res)
      }
    });
  }


  render() {
    console.log("what is challenger bet" + this.props.location.state.challengerbet)
    const {classes, children, className, ...other} = this.props;
    return (
        <div className="container-fluid" role="main">
          <div className="col s12 12"><MenuBar/></div>
          <h1 className="seeb" align="center">Multi Player Bet</h1>
          <h2 className={classNames(classes.root, className)}
              align="center">Challenger: {this.props.location.state.thechallenger} </h2>
          <h2 className={classNames(classes.root, className)} align="center">Stock to bet
            on: {this.props.location.state.tickerSymbolInputInput} </h2>
          <div className="row-flex">
            <div className="column-flex">
              <Card className="MultiChallengeeCard">
                <CardActionArea>
                  <CardMedia
                      title="Profile Picture"
                      component="img"
                      alt="User Profile Picture"
                      className="mediabet"
                      image="stock.jpeg"
                  />
                  <CardContent>
                    <Typography className={classNames(classes.subroot, className)} component="p">
                      The challengee waits for the challenger to submit the stock to be bet on
                      and then proceeds to predict the price point of that stock.
                      The winner is decided if they are closer to the price point of the actual stock on
                      the next opening
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="column-flex"><BetTabForChallengee/></div>
          </div>
        </div>
    )
  }
}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(MultiBetChallengee)));
