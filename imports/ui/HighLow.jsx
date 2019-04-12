import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withTracker } from "meteor/react-meteor-data";
import { Route, Redirect, Router, withRouter } from 'react-router-dom';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class HighLow extends React.Component {
  state = {
    Bet: '',
    open: false,
    value: ""
  };

  handleChange = event => {

    this.setState({ value: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Price Point</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.Bet}
            onChange={this.handleChange}
            inputProps={{
              name: 'Bet',
              id: 'demo-controlled-open-select',
            }}
            >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

HighLow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker (() => {
  return {
    user: Meteor.user()
  }
})(withRouter(withStyles(styles)(HighLow)));
