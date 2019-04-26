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
import BetTabMultiplayer from "./Bet-Tab-Multiplayer.jsx"
import classNames from 'classnames';


const styles = {
  root: {
    fontFamily: '"Montserrat", sans-serif',
  },
  subroot: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: "20px"
  }
};

class MultiBetChallenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickerSymbol: "",
      challenger: props.user
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.setState({
      tickerSymbol: "",
      challenger: props.user
    });

    this.props.history.push({
      pathname: "/multibetchallengee/" + this.state.challenger,
      state: {tickerSymbol: ""}
    });
  }


  render() {
    const {classes, children, className, ...other} = this.props;
    console.log("This is from MultibetChallenger", this.props)
    return (
        <div className="container-fluid" role="main">
          <div className="col s12 12"><MenuBar/></div>
          <h1 className="seeb" align="center">Multi Player Bet</h1>
          <h2 className={classNames(classes.root, className)}
              align="center">Challengee: {this.props.location.state.thechallengee} </h2>
          <div className="row-flex">
            <div className="column-flex">
              <Card className="NewCard">
                <CardActionArea>
                  <CardMedia
                      title="MultiBetChallenger"
                      component="img"
                      alt="MultiBetChallenger"
                      className="mediabet"
                      image="stock.jpeg"
                  />
                  <CardContent>
                    <Typography className={classNames(classes.subroot, className)} component="p">
                      The challenger submits the intended stock name and price point to be bet
                      on and upon submission waits for the other user to submit their prediction.
                      The winner is decided if they are closer to the price point of the actual stock on
                      the next opening
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
            <div className="column-flex"><BetTabMultiplayer/></div>
          </div>
        </div>
    )
  }
}

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(MultiBetChallenger)));
