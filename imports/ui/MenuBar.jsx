import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { withTracker } from "meteor/react-meteor-data";

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

class MenuAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: true,
      anchorEl: null,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange = event => {
    this.setState({auth: event.target.checked});
  };

  handleMenu = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    if (Meteor.user()) {
      Meteor.call("null.deleteAll", (err) => {
        if (err) {
          alert("There was an error deleting logged out user");
          console.log(err);
          return;
        } else {
          console.log(" Deleted from minimongo")
        }
        Meteor.logout();
      });
      this.props.history.push("/");
    }
  };

  render() {
    const {classes} = this.props;
    const {auth, anchorEl} = this.state;
    const open = Boolean(anchorEl);
    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link to="/profile">Wall-Street-Wagers</Link>
              </Typography>
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false" aria-label="hamburger">
                {Meteor.user() ? Meteor.user().username : ""}
              </Link>
              {auth && (
                  <div>
                    <IconButton
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                        aria-label="hamburger"
                    >
                      <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(MenuAppBar)));
