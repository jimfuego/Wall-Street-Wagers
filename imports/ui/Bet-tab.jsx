import { Component } from 'react';
import React from 'react';
import { Paper, withStyles, Grid, TextField, Button } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class BetTab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.padding}>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
          <Typography component="p">
            This section will house a description on how to properly place a bet.
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ipsum
          </Typography>
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="bet" label="TickerSymbol" type="text" fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField id="bet" label="Prediction Date" type="date" fullWidth required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
          <Grid item md={true} sm={true} xs={true}>
            <TextField id="bet" label="Predicted closing price (USD)" type="number" fullWidth required /></Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Make Prediction!</Button>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(BetTab);
