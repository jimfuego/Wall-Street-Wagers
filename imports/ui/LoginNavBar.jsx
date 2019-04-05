import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};
export class LoginNavBar extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      ancholEl: "",
    };
    this.handleClose = this.handleChange.bind(this);*/

}


  /*handleClose () {
    this.props.history.push("/");

  }*/



  render() {
    const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Wall-Street-Wagers
          </Typography>

              <div className="pos-f-t">
      <div className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {Meteor.user()? Meteor.user().username : ""}
        </Link>
      </div>
    </div>
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

LoginNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(LoginNavBar)));
